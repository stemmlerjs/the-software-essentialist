import app from './app';
const {PORT} = process.env;

app.listen(PORT, () => {
    console.log(`app listening to the port ${PORT}`);
});
