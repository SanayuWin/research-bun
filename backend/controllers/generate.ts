import db from '../config/db';

export async function generate(req: Request): Promise<Response> {
    try {
    
        const firstName = generateRandomName();
        const lastName = generateRandomName();
        const fullName = firstName + lastName;
        const randomUrl = `https://randomurl.com/${fullName}`;
        const dataRow = {
            First_Name: firstName,
            Last_Name: lastName,
            Email: generateRandomEmail(fullName),
            Date_of_Birth: generateRandomDate(),
            Gender: generateRandomGender(),
            Country: generateRandomCountry(),
            Annual_Income: generateRandomIncome(),
            Registration_Date: generateRandomDate(),
            Purchase_Type: generateRandomPurchaseType(),
            URL_Temp: randomUrl
        };

        try {
            const query = `
            INSERT INTO customers (
                first_name, last_name, email, date_of_birth, gender, 
                country, annual_income, registration_date, purchase_type, url_temp
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
            )
            `;
            await db.query(query, Object.values(dataRow));
        } catch (insertError) {
            console.error('Error inserting data:', insertError);
        }
       
        
        return new Response(JSON.stringify({ 
            msg: `Successfully insert` 
        }), {
            status: 200,
            headers: { 
                "Content-Type": "application/json; charset=UTF-8",
                "Connection": "keep-alive",
                "Keep-Alive": "timeout=5",
                "X-Powered-By": "Bun",
                "Vary": "Accept-Encoding",
                "Access-Control-Allow-Origin": "*"
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
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


export async function previewData(): Promise<Response> {
    try {
        // Replace the following with Bun's equivalent database query execution method
        const { rows } = await db.query('SELECT * FROM customers');
        return new Response(JSON.stringify(rows), {
            headers: { 
                "Content-Type": "application/json; charset=UTF-8",
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
  
export async function removeData(): Promise<Response> {
    try {
        // Replace the following with Bun's equivalent database query execution method
        await db.query('DELETE FROM customers');
        return new Response(JSON.stringify({ msg: 'All records deleted successfully.' }), {
            headers: { 
                "Content-Type": "application/json; charset=UTF-8",
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


function generateRandomName() {
    const names = [
        "Alice", "Bob", "Charlie", "David", "Eva",
        "Olivia", "Liam", "Emma", "Noah", "Ava",
        "Sophia", "William", "Isabella", "James", "Charlotte",
        "Benjamin", "Amelia", "Lucas", "Mia", "Henry",
        "Harper", "Ethan", "Evelyn", "Alexander", "Abigail",
        "Mason", "Emily", "Michael", "Ella", "Daniel",
        "Elizabeth", "Jacob", "Camila", "Logan", "Luna",
        "Jackson", "Sofia", "Sebastian", "Avery", "Jack",
        "Scarlett", "Aiden", "Victoria", "Owen", "Madison",
        "Samuel", "Luna", "Matthew", "Grace", "Joseph",
        "Chloe", "Levi", "Penelope", "Mateo", "Layla"
    ];
    return names[Math.floor(Math.random() * names.length)];
}

function generateRandomEmail(firstName) {
    return `${firstName.toLowerCase()}@example.com`;
}
function generateRandomDate() {
    const start = new Date(1970, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
}
function generateRandomGender() {
    const genders = ["Male", "Female", "Other"];
    return genders[Math.floor(Math.random() * genders.length)];
}
  
function generateRandomCountry() {
    const countries = ["USA", "Canada", "UK", "Australia", "Germany"];
    return countries[Math.floor(Math.random() * countries.length)];
}

function generateRandomIncome() {
    return Math.floor(Math.random() * 100000) + 20000; // Random income between 20,000 and 120,000
}

function generateRandomPurchaseType() {
    const types = [
        "Electronics", "Clothing", "Groceries", "Books", "Others",
        "Home and Garden", "Toys and Games", "Sports Equipment", "Health and Beauty",
        "Automotive", "Jewelry", "Office Supplies", "Pet Supplies", "Footwear",
        "Music and Movies", "Art and Craft Supplies", "Kitchenware", "Travel Accessories",
        "Fitness Gear", "Digital Services"
    ];
    return types[Math.floor(Math.random() * types.length)];
}
