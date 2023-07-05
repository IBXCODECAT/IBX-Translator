export default function handler(req: any, res: any) {
    return res.status(401).json({"code": 403, "type": "Unauthorized"});
}