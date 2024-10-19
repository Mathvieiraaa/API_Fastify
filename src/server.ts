import fastify from "fastify";

const server = fastify({logger: true});

// import cors from '@fastify/cors';

// server.register(cors, {
//     origin: "*",
//     methods: ["GET", "POST"]
// });

const teams = [ 
{id: 1, name: "Mclaren", base: "UK"},
{id: 2, name: "Mercedes", base: "UK"},
{id: 3, name: "Red Bull", base: "USA"},
];

const drivers = [
{id: 1, name: "Max Verstappen", team: "Red Bull"},
{id: 2, name: "Lewis Hamilton", team: "Ferrari"},
{id: 3, name: "Lando Norris", team: "McLaren"},
]

server.get("/teams", async (req, res) => {
    res.type("application/json").code(200)
    return {teams};
});

server.get("/drivers", async (req, res) => {
    res.type("application/json").code(200)
    return {drivers};
});

interface RouteParams{
    id: string;
}

server.get<{Params: RouteParams}>("/drivers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const driver = drivers.find( d => d.id === id);

    if(!driver) {
        res.type("application/json").code(404);
        return { message: "Drive not found"}
    }else {
        res.type("application/json").code(200);
        return {driver};
    }
  }
);

server.listen({ port: 3000}, () => {
    console.log("Server init");
});