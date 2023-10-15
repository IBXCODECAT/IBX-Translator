export default function handler(req: any, res: any) {
    return res.status(404).json({"code": 404, "type": "Root Resource Not Found"});
}