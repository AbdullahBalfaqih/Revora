import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { task_type, data } = body;
    
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'sk-or-v1-your-key-here') {
      return NextResponse.json({ error: 'OpenRouter API Key not configured' }, { status: 500 });
    }

    let systemPrompt = "You are a specialized AI agent for the Revora RWA platform.";
    let userPrompt = "";

    switch (task_type) {
      case 'evaluator':
        systemPrompt = `You are the Reality Score Evaluator. Your job is to assess the risk and validity of a Real World Asset being tokenized. 
Output your response as raw JSON matching this structure:
{
  "score": <number 0-100>,
  "risk_level": "<LOW, MEDIUM, HIGH>",
  "report": "<Brief 2-3 sentence due diligence summary>"
}
Do not wrap the JSON in markdown code blocks, just return the raw JSON string.`;
        userPrompt = `Evaluate the following asset: ${JSON.stringify(data)}`;
        break;

      case 'twin':
        systemPrompt = `You are a Digital Twin AI. Given the real-time data of an asset, predict short-term trends (next 6 months). Return a concise 3-sentence prediction.`;
        userPrompt = `Asset data: ${JSON.stringify(data)}`;
        break;

      case 'treasury':
        systemPrompt = `You are the Autonomous Treasury Manager. Given a wallet balance and a list of DeFi yield options, select the best option and explain your reasoning in 2 short sentences.`;
        userPrompt = `Wallet context: ${JSON.stringify(data)}`;
        break;

      case 'negotiator':
        systemPrompt = `You are simulating a negotiation between an AI Buyer Agent and an AI Seller Agent over an RWA token fraction.
The seller wants to sell high. The buyer wants to buy low.
Input will be the current state of negotiation. Generate the NEXT response from the specified role.`;
        userPrompt = `Role to play: ${data.role}. Context: ${data.context}. Current offer: ${data.current_offer}. Provide your counter-offer or acceptance in 1 short punchy sentence.`;
        break;
        
      default:
        return NextResponse.json({ error: 'Unknown task_type' }, { status: 400 });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct:free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API Error:", errorText);
      return NextResponse.json({ error: 'Failed to fetch from OpenRouter' }, { status: 500 });
    }

    const responseData = await response.json();
    let resultText = responseData.choices[0].message.content.trim();

    // If evaluator, try to parse JSON
    if (task_type === 'evaluator') {
      try {
        // Simple cleanup in case the LLM wrapped it in markdown
        if (resultText.startsWith('\`\`\`json')) {
            resultText = resultText.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
        }
        const parsed = JSON.parse(resultText);
        return NextResponse.json({ result: parsed });
      } catch (e) {
        console.error("Failed to parse LLM JSON response:", resultText);
        return NextResponse.json({ error: 'LLM returned invalid JSON' }, { status: 500 });
      }
    }

    return NextResponse.json({ result: resultText });

  } catch (error) {
    console.error("Agents API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
