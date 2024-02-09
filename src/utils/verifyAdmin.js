const verifyAdmin = (req, res, next) => {
    const { rol } = req.user;

    if (rol !== "admin") {
        return res.status(403).send({ error: "You are not an admin" });
    } else {
        next();
    }
};

module.exports = verifyAdmin;