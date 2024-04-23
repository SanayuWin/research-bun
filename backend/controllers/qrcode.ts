import db from '../config/db';
import QRCode from "qrcode";

export async function genQRCode(): Promise<Response> {
    try {
        const result = await db.query('SELECT url_temp FROM customers ORDER BY RANDOM() LIMIT 1');
        const urlData = result.rows[0].url_temp; 
        const qrCodeDataURL = await QRCode.toDataURL(urlData);
        const qrCodeBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64');

        return new Response(qrCodeBuffer, {
            status: 200,
            headers: { 
                "Content-Type": "image/png",
                "Content-Disposition": 'attachment; filename=qrcode.png',
                "Connection": "keep-alive",
                "Keep-Alive": "timeout=5",
                "X-Powered-By": "Bun",
                "Vary": "Accept-Encoding",
                "Access-Control-Allow-Origin": "*"
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Server Error' }), {
            status: 500,
            headers: { 
                "Content-Type": "application/json; charset=UTF-8",
                "Connection": "keep-alive",
                "Keep-Alive": "timeout=5",
                "X-Powered-By": "Bun",
                "Vary": "Accept-Encoding",
                "Access-Control-Allow-Origin": "*"
            },
        });
    }
}
