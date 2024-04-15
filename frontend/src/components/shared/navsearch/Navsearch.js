import './Navsearch.css'

const Navsearch = () => {

    return (
        <div className={`searchbar ${showSearchBar ? 'searchbar-open' : ''}`}>
            <div className='search-prompt'>What do you like to explore?</div>
            <div className='searchbox'>
                <div><input type='text'/></div>
                <div><ArrowRight /></div>
            </div>
        </div>
    )
}

export default Navsearch;