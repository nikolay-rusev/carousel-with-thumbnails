import React from "react";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideCount: 6,
            selectionId: 0
        };

        this.changeSelection = this.changeSelection.bind(this);
    }

    changeSelection(event) {
        let newId = parseInt(event.currentTarget.htmlFor);
        this.setState({
            selectionId: newId
        });
    }

    textGenerator() {
        return "Lorem ipsum dolor sit amet consectetur adipisicing elit.";
    }

    takenByGenerator() {
        return "Photo: Tim Marshall";
    }

    imageUrlGenerator(index, thumbnail) {
        if (thumbnail) {
            return `https://picsum.photos/id/1${index}${index}/150/150`;
        }
        return `https://picsum.photos/id/1${index}${index}/800/450`;
    }

    renderInputs() {
        let elements = [];
        let input;
        for (let i = 0; i < this.state.slideCount; i++) {
            input = <input type="radio" name="slides" id={i} />;
            if (this.state.selectionId === i)
                input = <input type="radio" name="slides" checked="checked" id={i} />;
            elements.push(input);
        }
        return elements;
    }

    renderSlides() {
        let elements = [];
        for (let i = 0; i < this.state.slideCount; i++) {
            let style = {};
            if (i === 0) {
                style.marginLeft = "-" + this.state.selectionId * 100 + "%";
            }
            let src = this.imageUrlGenerator(i);
            let listItem = (
                <li className="carousel__slide" style={style}>
                    <figure>
                        <div>
                            <img src={src} alt="" />
                        </div>
                        <figcaption>
                            {this.textGenerator()}
                            <span className="credit">{this.takenByGenerator()}</span>
                        </figcaption>
                    </figure>
                </li>
            );
            elements.push(listItem);
        }
        return <ul className="carousel__slides">{elements}</ul>;
    }

    renderThumbnails() {
        let elements = [];
        for (let i = 0; i < this.state.slideCount; i++) {
            let style = {};
            let src = this.imageUrlGenerator(i, true);
            if (this.state.selectionId === i) {
                style.boxShadow = "0px 0px 0px 5px rgba(0,0,255,0.5)";
            }
            let listItem = (
                <li style={style}>
                    <label htmlFor={i} onClick={this.changeSelection}>
                        <img src={src} alt="" />
                    </label>
                </li>
            );
            elements.push(listItem);
        }
        return <ul className="carousel__thumbnails">{elements}</ul>;
    }

    render() {
        let inputs = this.renderInputs();
        let slides = this.renderSlides();
        let thumbnails = this.renderThumbnails();
        return (
            <section>
                <div className="container">
                    <div className="carousel">
                        {inputs}
                        {slides}
                        {thumbnails}
                    </div>
                </div>
            </section>
        );
    }
}
