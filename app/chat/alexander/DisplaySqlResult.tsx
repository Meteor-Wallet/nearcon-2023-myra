export default function DisplaySqlResult({
    sqlResult,
}: {
    sqlResult: Record<string, any>[];
}) {
    if (sqlResult.length === 0) {
        return <>None</>;
    }

    const sqlKeys = Object.keys(sqlResult[0]);

    if (sqlKeys.length === 0) {
        return <>None</>;
    }

    return (
        <>
            {sqlResult.map((result, index) => {
                const resultKey = Object.keys(result);

                const resultSummaryKey = resultKey.shift() as string;

                return (
                    <details key={index} className='collapse bg-base-200'>
                        <summary className='collapse-title text-md font-medium'>
                            <strong>{resultSummaryKey}:</strong>{' '}
                            {result[resultSummaryKey]}
                            <div className='collapse-content'>
                                {resultKey.map((key, index) => (
                                    <p key={index}>
                                        <strong>{key}:</strong> {result[key]}
                                    </p>
                                ))}
                            </div>
                        </summary>
                    </details>
                );
            })}
        </>
    );
}
