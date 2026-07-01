#![no_std]
#![no_main]

extern crate alloc;

use alloc::{string::String, vec};
use casper_contract::{
    contract_api::{runtime, storage},
    unwrap_or_revert::UnwrapOrRevert,
};
use casper_types::{
    contracts::NamedKeys, ApiError, CLType, CLValue, EntryPoint, EntryPointAccess, EntryPointType, EntryPoints, Parameter, U256
};

#[no_mangle]
pub extern "C" fn init() {
    let token_name: String = runtime::get_named_arg("token_name");
    let token_symbol: String = runtime::get_named_arg("token_symbol");
    let total_supply: U256 = runtime::get_named_arg("total_supply");
    let asset_type: String = runtime::get_named_arg("asset_type"); // e.g. "Yielding" or "CapitalAppreciation"
    let legal_document_uri: String = runtime::get_named_arg("legal_document_uri"); // IPFS link to deeds/SPV
    let kyc_required: bool = runtime::get_named_arg("kyc_required"); // KYC enforcement
    let lockup_end_timestamp: u64 = runtime::get_named_arg("lockup_end_timestamp"); // Vesting/Lockup period
    
    // GCC specific regulatory parameters
    let is_shariah_compliant: bool = runtime::get_named_arg("is_shariah_compliant"); // Islamic Finance compliance
    let is_freehold_zone: bool = runtime::get_named_arg("is_freehold_zone"); // Allows foreign ownership if true
    let max_ownership_percentage: u8 = runtime::get_named_arg("max_ownership_percentage"); // Anti-monopoly (e.g. 10%)
    let admin_clawback_enabled: bool = runtime::get_named_arg("admin_clawback_enabled"); // Court/Regulator mandated asset freezing/recovery
    
    // International Real Estate Standards
    let appraisal_uri: String = runtime::get_named_arg("appraisal_uri"); // 3rd party independent valuation (e.g. JLL/CBRE)
    let insurance_policy_uri: String = runtime::get_named_arg("insurance_policy_uri"); // Required Property Insurance
    let esg_score: u8 = runtime::get_named_arg("esg_score"); // Environmental, Social, and Governance Score (0-100)
    
    // Store token details
    runtime::put_key("name", storage::new_uref(token_name).into());
    runtime::put_key("symbol", storage::new_uref(token_symbol).into());
    runtime::put_key("total_supply", storage::new_uref(total_supply).into());
    runtime::put_key("asset_type", storage::new_uref(asset_type).into());
    runtime::put_key("legal_document_uri", storage::new_uref(legal_document_uri).into());
    runtime::put_key("kyc_required", storage::new_uref(kyc_required).into());
    runtime::put_key("lockup_end_timestamp", storage::new_uref(lockup_end_timestamp).into());
    
    // Store GCC regulatory details
    runtime::put_key("is_shariah_compliant", storage::new_uref(is_shariah_compliant).into());
    runtime::put_key("is_freehold_zone", storage::new_uref(is_freehold_zone).into());
    runtime::put_key("max_ownership_percentage", storage::new_uref(max_ownership_percentage).into());
    runtime::put_key("admin_clawback_enabled", storage::new_uref(admin_clawback_enabled).into());
    
    // Store International Standards
    runtime::put_key("appraisal_uri", storage::new_uref(appraisal_uri).into());
    runtime::put_key("insurance_policy_uri", storage::new_uref(insurance_policy_uri).into());
    runtime::put_key("esg_score", storage::new_uref(esg_score).into());
    
    // Store owner balance
    let caller = runtime::get_caller();
    runtime::put_key("owner", storage::new_uref(caller).into());
}

#[no_mangle]
pub extern "C" fn call() {
    let mut entry_points = EntryPoints::new();
    
    let init_entry_point = EntryPoint::new(
        "init",
        vec![
            Parameter::new("token_name", CLType::String),
            Parameter::new("token_symbol", CLType::String),
            Parameter::new("total_supply", CLType::U256),
            Parameter::new("asset_type", CLType::String),
            Parameter::new("legal_document_uri", CLType::String),
            Parameter::new("kyc_required", CLType::Bool),
            Parameter::new("lockup_end_timestamp", CLType::U64),
            Parameter::new("is_shariah_compliant", CLType::Bool),
            Parameter::new("is_freehold_zone", CLType::Bool),
            Parameter::new("max_ownership_percentage", CLType::U8),
            Parameter::new("admin_clawback_enabled", CLType::Bool),
            Parameter::new("appraisal_uri", CLType::String),
            Parameter::new("insurance_policy_uri", CLType::String),
            Parameter::new("esg_score", CLType::U8),
        ],
        CLType::Unit,
        EntryPointAccess::Public,
        EntryPointType::Contract,
    );
    entry_points.add_entry_point(init_entry_point);

    let (contract_hash, _contract_version) = storage::new_contract(
        entry_points,
        None,
        Some(String::from("rwa_factory_package_hash")),
        Some(String::from("rwa_factory_access_uref")),
    );
    
    runtime::put_key("rwa_factory_contract", contract_hash.into());
}
