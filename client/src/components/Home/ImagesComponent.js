

import PropTypes from 'prop-types';
import React from 'react';
import Gallery from 'react-grid-gallery';


function shuffleArray(array) {
	let i = array.length - 1;
	for (; i > 0; i--) {
	  const j = Math.floor(Math.random() * (i + 1));
	  const temp = array[i];
	  array[i] = array[j];
	  array[j] = temp;
	}
	return array;
  }


class ImagesComponent extends React.Component {
	
    constructor(props){
        super(props);
        this.state = {
            images: this.props.images
        };
    }

    setCustomTags (i) {
        return (
            i.tags.map((t) => {
                return (<div
                        key={t.value}
                        style={customTagStyle}>
                        {t.title}
                        </div>);
            })
        );
    }

    render () {
        var images =
                this.state.images.map((i) => {
                    i.customOverlay = (
                            <div style={captionStyle}>
                            <div>{i.caption}</div>
                            {i.hasOwnProperty('tags') &&
                             this.setCustomTags(i)}
                        </div>);
                    return i;
                });


        return (
                <div style={{
                    display: "block",
                    minHeight: "1px",
                    width: "100%",
                    border: "1px solid #ddd",
                    overflow: "auto"}}>
                <Gallery
            images={images}
            enableImageSelection={false}/>
                </div>
        );
    }
}

ImagesComponent.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            thumbnail: PropTypes.string.isRequired,
            srcset: PropTypes.array,
            caption: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.element
            ]),
            thumbnailWidth: PropTypes.number.isRequired,
            thumbnailHeight: PropTypes.number.isRequired
        })
    ).isRequired
};

const captionStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    maxHeight: "240px",
    overflow: "hidden",
    position: "absolute",
    bottom: "0",
    width: "100%",
    color: "white",
    padding: "2px",
    fontSize: "90%"
};

const customTagStyle = {
    wordWrap: "break-word",
    display: "inline-block",
    backgroundColor: "white",
    height: "auto",
    fontSize: "75%",
    fontWeight: "600",
    lineHeight: "1",
    padding: ".2em .6em .3em",
    borderRadius: ".25em",
    color: "black",
    verticalAlign: "baseline",
    margin: "2px"
};

ImagesComponent.defaultProps = {
    images: shuffleArray([
        {
            src: require("../../assets/images/img1.jpg"),
            thumbnail: require("../../assets/images/img1.jpg"),
            // thumbnailWidth: 271,
            // thumbnailHeight: 320,
            tags: [{value: "Nature", title: "Nature | Flowers"}],
            caption: "Hello",
        },
        {
            src: require("../../assets/images/img2.jpg"),
            thumbnail: require("../../assets/images/img2.jpg"),
            // thumbnailWidth: 320,
            // thumbnailHeight: 190,
            tags: [{value: "Architecture", title: "Architecture | Outdoors"},
                   {value: "Industrial", title: "Industrial"}],
            caption: "286H (gratisography.com)"
        },
        {
            src: require("../../assets/images/img3.jpg"),
            thumbnail: require("../../assets/images/img3.jpg"),
            // thumbnailWidth: 320,
            // thumbnailHeight: 148,
            tags: [{value: "People", title: "People"},
                   {value: "Architecture", title: "Architecture | Outdoors"},
                   {value: "Industrial", title: "Industrial"}],
            caption: "315H (gratisography.com)"
        },
        {
            src: require("../../assets/images/jpgirl.jpg"),
            thumbnail: require("../../assets/images/jpgirl.jpg"),
            // thumbnailWidth: 320,
            // thumbnailHeight: 213,
            caption: "201H (gratisography.com)"
        },
        {
            src: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
            thumbnail: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_n.jpg",
            thumbnailWidth: 248,
            thumbnailHeight: 320,
            caption: "Big Ben (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c1.staticflickr.com/9/8785/28687743710_870813dfde_h.jpg",
            thumbnail: "https://c1.staticflickr.com/9/8785/28687743710_3580fcb5f0_n.jpg",
            // thumbnailWidth: 320,
            // thumbnailHeight: 113,
            tags: [{value: "People", title: "People"},
                   {value: "Industrial", title: "Industrial"}],
            caption: "Red Zone - Paris (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg",
            thumbnail: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_n.jpg",
            thumbnailWidth: 313,
            thumbnailHeight: 320,
            caption: "Wood Glass (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
            thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 213,
            tags: [{value: "Nature", title: "Nature | Flowers"}],
            caption: "Flower Interior Macro (Tom Eversley - isorepublic.com)"
        }
    ])
};
export default ImagesComponent

// ReactDOM.render(<ImagesComponent />, document.getElementById('ImagesComponent'));