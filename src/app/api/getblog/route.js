
import { NextRequest, NextResponse } from 'next/server';
import pool from '@/database/db';

export async function GET(req, res) {
    try {

        const params = new URLSearchParams(req.url.split('?')[1]);
        
      // Now you can access individual parameters using the get method
        const slug = params.get('slug');
        console.log('slug inside getblog is:', slug)
       
        console.log('slug inside getblog:', slug);
        
        const getConn = await pool.getConnection()

        const [rows] = await getConn.execute("CALL getBlog(?)", [slug]);

        console.log('rows data is:', rows[0][0])

        return NextResponse.json({  result: rows[0][0] }, { status: 200 });
        
    } catch (error) {
        console.error('Error during blog fetching:', error);
        return NextResponse.json({  error: 'Failed to fetch blog' }, { status: 500 });
    }
}