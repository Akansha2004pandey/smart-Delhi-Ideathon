
export const createComplain=async (request)=>{
    try{
        const response = await fetch("http://localhost:8000/api/complain", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        console.log(response);
        if(!response.ok){   
             console.log("Error creating complain");
        }

        return response.status;
        return data;
    }catch(err){
        console.log(err);
    }
}

