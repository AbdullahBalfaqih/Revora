#![no_std]
#![no_main]

extern crate alloc;

use alloc::{string::String, vec};
use casper_contract::{
    contract_api::{runtime, storage, system},
    unwrap_or_revert::UnwrapOrRevert,
};
use casper_types::{
    contracts::NamedKeys, ApiError, CLType, CLValue, EntryPoint, EntryPointAccess, EntryPointType, EntryPoints, Parameter, U256, account::AccountHash
};

#[no_mangle]
pub extern "C" fn init() {
    let revora_treasury: AccountHash = runtime::get_named_arg("revora_treasury");
    let performance_fee_percent: U256 = runtime::get_named_arg("performance_fee_percent"); // e.g. 1%
    
    runtime::put_key("revora_treasury", storage::new_uref(revora_treasury).into());
    runtime::put_key("performance_fee_percent", storage::new_uref(performance_fee_percent).into());
}

#[no_mangle]
pub extern "C" fn distribute_yield() {
    // This endpoint is called by the AI agent when a company deposits rent/yield
    let asset_token_hash: String = runtime::get_named_arg("asset_token_hash");
    let total_yield_amount: U256 = runtime::get_named_arg("total_yield_amount");
    
    // 1. Calculate Performance Fee for Revora
    let fee_percent: U256 = runtime::get_key("performance_fee_percent")
        .unwrap_or_revert()
        .into_uref()
        .unwrap_or_revert()
        .read()
        .unwrap_or_revert();
        
    let fee_amount = (total_yield_amount * fee_percent) / U256::from(100);
    let distributable_yield = total_yield_amount - fee_amount;
    
    // In a real scenario, we transfer `fee_amount` of USDC to `revora_treasury`
    // And query the `asset_token_hash` contract to get all token holders and their balances
    // Then we iterate through the token holders and distribute the `distributable_yield` proportionally.
    
    // We log the event for the UI to pick up
    runtime::put_key("last_yield_distributed", storage::new_uref(distributable_yield).into());
    runtime::put_key("last_fee_collected", storage::new_uref(fee_amount).into());
}

#[no_mangle]
pub extern "C" fn auto_compound() {
    // AI Yield Routing: Instead of taking USDC, reinvest into the highest yielding RWA
    let user_account: AccountHash = runtime::get_named_arg("user_account");
    let yield_amount: U256 = runtime::get_named_arg("yield_amount");
    let target_rwa_hash: String = runtime::get_named_arg("target_rwa_hash");
    
    // Call the Marketplace contract to buy `target_rwa_hash` tokens using `yield_amount`
    // This is the core "Agentic AI" automated execution feature!
}

#[no_mangle]
pub extern "C" fn call() {
    let mut entry_points = EntryPoints::new();
    
    entry_points.add_entry_point(EntryPoint::new(
        "init",
        vec![
            Parameter::new("revora_treasury", CLType::ByteArray(32)),
            Parameter::new("performance_fee_percent", CLType::U256),
        ],
        CLType::Unit,
        EntryPointAccess::Public,
        EntryPointType::Contract,
    ));

    entry_points.add_entry_point(EntryPoint::new(
        "distribute_yield",
        vec![
            Parameter::new("asset_token_hash", CLType::String),
            Parameter::new("total_yield_amount", CLType::U256),
        ],
        CLType::Unit,
        EntryPointAccess::Public,
        EntryPointType::Contract,
    ));

    entry_points.add_entry_point(EntryPoint::new(
        "auto_compound",
        vec![
            Parameter::new("user_account", CLType::ByteArray(32)),
            Parameter::new("yield_amount", CLType::U256),
            Parameter::new("target_rwa_hash", CLType::String),
        ],
        CLType::Unit,
        EntryPointAccess::Public,
        EntryPointType::Contract,
    ));

    let (contract_hash, _) = storage::new_contract(
        entry_points,
        None,
        Some(String::from("yield_router_package_hash")),
        Some(String::from("yield_router_access_uref")),
    );
    
    runtime::put_key("yield_router_contract", contract_hash.into());
}
