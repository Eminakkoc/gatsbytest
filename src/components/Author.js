import * as React from "react"
import PropTypes from "prop-types"
import "./author.css"

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const Author = ({ image, name, twitterURL, facebookURL, linkedinURL, readTime, publishedAt }) => {
    const date = new Date(publishedAt)

    return (
        <div class="author">
            <img class="image" src={image}/>
            <div class="info">
                <span>{name}</span>
                <span class="date">{`${MONTHS[date.getMonth()]} ${date.getDate()} · ${readTime} min read`}</span>
            </div>
        </div>
    )
}

Author.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    twitterURL: PropTypes.string,
    facebookURL: PropTypes.string,
    linkedinURL: PropTypes.string,
    readTime: PropTypes.string,
    publishedAt: PropTypes.string,
}

export default Author
