import searchHomePageService from "../services/searchHomePageService";

let searchHomePage = async (req, res) => {
    try {
        const keyword = req.query.q;
        const results = await searchHomePageService.searchHomePage(keyword);
        res.json(results);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    searchHomePage
};