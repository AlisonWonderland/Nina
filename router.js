



app.post('/reddit-search', async (req,res) => {
    const username = req.body.user_search;
    const comments = await getRedditComments(username);
    analyzeText(comments);
    res.redirect('/');
})