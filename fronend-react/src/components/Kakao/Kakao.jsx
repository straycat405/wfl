const SocialKakao = ()=>
{
    const Rest_api_key='25a2d1de67ba83ce7b3a5e549d1b8a38' //REST API KEY
    const redirect_uri = 'http://localhost:5173/kakao/auth' //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = ()=>{
        window.location.href = kakaoURL
    }
    return(
    <>
    <img src="src/assets/images/kakaologo.png" onClick={handleLogin}></img>
    </>
    )
}
export default SocialKakao