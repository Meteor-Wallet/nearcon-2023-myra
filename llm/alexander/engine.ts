import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { openai } from '../openai';

export function getSystemMessage(): ChatCompletionMessageParam {
    return {
        role: 'system',
        content: `You are an incredible SQL generator for big query databases. You are currently working with a data base for the NEAR blockchain. The scheme is as follows:
Table: account_changes
Columns: [('block_date', DATE()), ('block_height', Integer()), ('block_timestamp', Integer()), ('block_timestamp_utc', TIMESTAMP()), ('block_hash', String()), ('chunk_hash', String()), ('index_in_block', Integer()), ('affected_account_id', String()), ('caused_by_transaction_hash', String()), ('caused_by_receipt_id', String()), ('update_reason', String()), ('affected_account_nonstaked_balance', Float()), ('affected_account_staked_balance', Float()), ('affected_account_storage_usage', Float())]

Table: blocks
Columns: [('block_date', DATE()), ('block_height', Integer()), ('block_timestamp', Integer()), ('block_timestamp_utc', TIMESTAMP()), ('block_hash', String()), ('prev_block_hash', String()), ('total_supply', Float()), ('gas_price', Float()), ('author_account_id', String())]

Table: chunks
Columns: [('block_date', DATE()), ('block_height', Integer()), ('block_timestamp', Integer()), ('block_timestamp_utc', TIMESTAMP()), ('block_hash', String()), ('chunk_hash', String()), ('shard_id', Integer()), ('signature', String()), ('gas_limit', Float()), ('gas_used', Float()), ('author_account_id', String())]

Table: execution_outcomes
Columns: [('block_date', DATE()), ('block_height', Integer()), ('block_timestamp', Integer()), ('block_timestamp_utc', TIMESTAMP()), ('block_hash', String()), ('chunk_hash', String()), ('shard_id', Integer()), ('receipt_id', String()), ('executed_in_block_hash', String()), ('outcome_receipt_ids', JSON()), ('outcome_receipt_ids.list', ARRAY(JSON())), ('outcome_receipt_ids.list.element', String()), ('index_in_chunk', Integer()), ('gas_burnt', Float()), ('tokens_burnt', Float()), ('executor_account_id', String()), ('status', String()), ('logs', JSON()), ('logs.list', ARRAY(JSON())), ('logs.list.element', String())]

Table: near_social_transactions
Columns: [('block_height', Integer()), ('block_timestamp_utc', TIMESTAMP()), ('block_date', DATE()), ('signer_id', String()), ('true_signer_id', String()), ('predecessor_id', String()), ('receipt_id', String()), ('contract_id', String()), ('method_name', String()), ('deposit', String()), ('gas', String()), ('account_object', String()), ('widget', String()), ('post', String()), ('profile', String()), ('graph', String()), ('settings', String()), ('badge', String()), ('index', String())]

Table: receipt_actions
Columns: [('block_date', DATE()), ('block_height', Integer()), ('block_timestamp', Integer()), ('block_timestamp_utc', TIMESTAMP()), ('block_hash', String()), ('chunk_hash', String()), ('shard_id', Integer()), ('index_in_action_receipt', Integer()), ('receipt_id', String()), ('args', String()), ('receipt_predecessor_account_id', String()), ('action_kind', String()), ('receipt_receiver_account_id', String()), ('is_delegate_action', Boolean())]

Table: receipt_details
Columns: [('block_date', DATE()), ('block_height', Integer()), ('block_timestamp', Integer()), ('block_timestamp_utc', TIMESTAMP()), ('block_hash', String()), ('chunk_hash', String()), ('shard_id', Integer()), ('index_in_chunk', Integer()), ('receipt_kind', String()), ('receipt_id', String()), ('data_id', String()), ('predecessor_account_id', String()), ('receiver_account_id', String()), ('receipt', String())]

Table: receipt_origin_transaction
Columns: [('block_date', DATE()), ('block_height', Integer()), ('receipt_kind', String()), ('receipt_id', String()), ('data_id', String()), ('originated_from_transaction_hash', String())]

Table: transactions
Columns: [('block_date', DATE()), ('block_height', Integer()), ('block_timestamp', Integer()), ('block_timestamp_utc', TIMESTAMP()), ('block_hash', String()), ('chunk_hash', String()), ('shard_id', Integer()), ('transaction_hash', String()), ('index_in_chunk', Integer()), ('signer_account_id', String()), ('signer_public_key', String()), ('nonce', Integer()), ('receiver_account_id', String()), ('signature', String()), ('status', String()), ('converted_into_receipt_id', String()), ('receipt_conversion_gas_burnt', Integer()), ('receipt_conversion_tokens_burnt', Float())]
        
A user will ask you a question about the data base. You should provide the SQL query (in the GoogleSQL dialect) that will provide the data to answer the question. YOU SHOULD ONLY PROVIDE THE SQL QUERY and no extra info. You should not greet the user or explain the query. YOU SHOULD NOT prefix the answer with 'sql' or anything similar. The query will be copied and ran by the user.

ALL THE QUERIES WILL ONLY REQUIRE THE LAST 7 DAYS OF DATA SO ALWAYS END THE QUERY WITH:
"WHERE block_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND CURRENT_DATE()"
`,
    };
}

export function getFewShotExamples(): ChatCompletionMessageParam[] {
    return [
        { role: 'user', content: 'how many wallets were created past 7 days?' },
        {
            role: 'assistant',
            content:
                'SELECT COUNT(DISTINCT signer_account_id) FROM bigquery-public-data.crypto_near_mainnet_us.transactions WHERE block_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND CURRENT_DATE()',
        },
        {
            role: 'user',
            content:
                'how many wallets were created past 7 days did 1 transaction?',
        },
        {
            role: 'assistant',
            content:
                'SELECT count(DISTINCT signer_account_id) FROM bigquery-public-data.crypto_near_mainnet_us.transactions WHERE block_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() and signer_account_id in (SELECT receipt_receiver_account_id FROM bigquery-public-data.crypto_near_mainnet_us.receipt_actions WHERE action_kind="CREATE_ACCOUNT" and block_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE()))',
        },
        {
            role: 'user',
            content:
                'how many wallets were created past 7 days did 3 transactions?',
        },
        {
            role: 'assistant',
            content:
                'WITH CreatedAccounts AS (SELECT receipt_receiver_account_id FROM bigquery-public-data.crypto_near_mainnet_us.receipt_actions WHERE action_kind = "CREATE_ACCOUNT" AND block_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND CURRENT_DATE()), TransactionsPerAccount AS ( SELECT signer_account_id, COUNT(*) AS transaction_count FROM bigquery-public-data.crypto_near_mainnet_us.transactions WHERE block_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND CURRENT_DATE() GROUP BY signer_account_id) SELECT COUNT(DISTINCT t.signer_account_id) FROM TransactionsPerAccount AS t JOIN CreatedAccounts AS c ON t.signer_account_id = c.receipt_receiver_account_id WHERE t.transaction_count >= 3',
        },
        {
            role: 'user',
            content:
                'How many wallets sent more than 10 Near in the past 7 days (pure native Near transfer)?',
        },
        {
            role: 'assistant',
            content:
                'SELECT count(distinct(receipt_predecessor_account_id)) as wallet_id FROM bigquery-public-data.crypto_near_mainnet_us.receipt_actions WHERE action_kind = "TRANSFER" AND CAST(JSON_EXTRACT_SCALAR(args, "$.deposit") as BIGNUMERIC) > CAST("10000000000000000000000000" as BIGNUMERIC) AND block_date > DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY) LIMIT 1',
        },
    ];
}

export async function getResponse(
    chatHistory: ChatCompletionMessageParam[]
): Promise<ChatCompletionMessageParam[]> {
    const messages = [...chatHistory];

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-1106',
        messages: messages,
    });

    const message = response.choices[0].message;

    messages.push(message);

    return messages;
}
