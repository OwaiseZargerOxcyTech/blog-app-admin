
import { NextRequest, NextResponse } from 'next/server';
import pool from '@/database/db';

export async function GET(req, res) {
    try {
        
        const getConn = await pool.getConnection()

        const [rows] = await getConn.execute('CALL getBlogs()');

        console.log('rows data is:', rows[0])

        return NextResponse.json({  result : rows[0] }, { status: 200 });
        
    } catch (error) {
        console.error('Error during getting customers data:', error);
        return NextResponse.json({  error: 'Failed to get customers data' }, { status: 500 });
    }
}