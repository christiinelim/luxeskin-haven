const Newsletter = () => {

    return (
        <div className = "newletter-container">
            <div className="newletter-pic col-6"></div>
            <div className="newsletter-content col-6">
                <div className="newsletter-content1">
                JOIN OUR NEWSLETTER
                </div>
                <div className="newsletter-content2">
                Receive information about our exclusive promotional events!
                </div>
                <div className="newsletter-content3">
                <form>
                    <input placeholder="Enter email address" />
                    <div className="button-submit"><button>Join</button></div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Newsletter