import { sql } from '@vercel/postgres';

export async function GET() {
    try {
        const data = await sql`
      SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666;
    `;

        return new Response(JSON.stringify(data.rows), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Database Query Error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch data' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
