const testReq = async () => {
    try {
        const response = await fetch("http://localhost:4123/api/coordinator", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cedula: 111111,
                nombre: "Goku Test 2",
                departamento: "RRHH",
                cargo: "God",
                correo: "goku2@test.com",
                proyecto: ["723b17f4-d88f-41db-afc3-5c1b753d0a22"],
                password: "12345"
            })
        });
        const data = await response.json();
        console.log("STATUS:", response.status);
        console.log("RESPONSE:", data);
    } catch (e) {
        console.error(e);
    }
};
testReq();
