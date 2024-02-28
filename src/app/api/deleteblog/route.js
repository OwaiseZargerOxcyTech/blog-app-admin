
import { NextRequest, NextResponse } from 'next/server';
import fs, { writeFile } from 'fs';
import path from 'path';
import pool from '@/database/db';

  
  export async function DELETE(req) {
    try {

        const data = await req.formData()
        console.log('data is: ', data)
        const selectedId = data.get('selectedId')
        const previousimage = data.get('previousimage')
        if(!previousimage) {
            return NextResponse.json({success1 : false})
        }

        
        const previousImagePath = `./public/${previousimage}`;

        if (fs.existsSync(previousImagePath)) {
            // Delete the file
            fs.unlinkSync(previousImagePath);
            console.log('File deleted successfully');
        } else {
            console.log('File does not exist');
        }

        const getConn = await pool.getConnection()

        const [rows] = await getConn.execute("CALL deleteBlog(?)", [selectedId]);

        console.log('rows data is:', rows)

        return NextResponse.json({ result : rows }, { status: 200 });
        
      // Respond with success message
      } catch (error) {
        console.error('Error during blog addition:', error);
        return NextResponse.json({  error: 'Failed to add blog' }, { status: 500 });
    }
  };

