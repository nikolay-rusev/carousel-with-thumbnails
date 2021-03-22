import React from "react";
import { animals, starWars, uniqueNamesGenerator } from "unique-names-generator";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showArrows: false,
            slideCount: 12,
            selectionId: 0,
            autoPlay: false,
            autoPlayInterval: 3000
        };

        this.changeSelection = this.changeSelection.bind(this);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.autoPlay = this.autoPlay.bind(this);
    }

    componentDidMount() {
        if (this.state.autoPlay) {
            this.interval = setInterval(this.autoPlay, this.state.autoPlayInterval);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    autoPlay() {
        let currentId = this.state.selectionId;
        let newId = currentId + 1;
        if (newId >= this.state.slideCount) {
            newId = 0;
        }
        this.setState({
            selectionId: newId
        });
    }

    increment() {
        let newId = this.state.selectionId + 1;
        if (newId >= this.state.slideCount) {
            newId = this.state.slideCount - 1;
        }
        this.setState({
            selectionId: newId
        });
    }

    decrement() {
        let newId = this.state.selectionId - 1;
        if (newId < 0) {
            newId = 0;
        }
        this.setState({
            selectionId: newId
        });
    }

    changeSelection(event) {
        let newId = parseInt(event.currentTarget.htmlFor);
        this.setState({
            selectionId: newId
        });
    }

    textGenerator() {
        let randomAnimalName = uniqueNamesGenerator({
            dictionaries: [animals]
        });
        return randomAnimalName + ": Lorem ipsum dolor sit amet consectetur adipisicing elit.";
    }

    takenByGenerator() {
        return uniqueNamesGenerator({
            dictionaries: [starWars]
        });
    }

    imageUrlGenerator(index, thumbnail) {
        if (thumbnail) {
            return `https://picsum.photos/id/1${index}/150/150`;
        }
        return `https://picsum.photos/id/1${index}/800/450`;
    }

    renderInputs() {
        let elements = [];
        let input;
        for (let i = 0; i < this.state.slideCount; i++) {
            input =
                this.state.selectionId === i ? (
                    <input type="radio" name="slides" defaultChecked={true} id={i} key={i} />
                ) : (
                    <input type="radio" name="slides" id={i} key={i} />
                );
            elements.push(input);
        }
        return elements;
    }

    renderSlides() {
        let elements = [];
        for (let i = 0; i < this.state.slideCount; i++) {
            let src = this.imageUrlGenerator(i);
            let style = i === 0 ? { marginLeft: "-" + this.state.selectionId * 100 + "%" } : {};
            let listItem = (
                <li className="carousel__slide" key={i} style={style}>
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
            style.maxWidth = `calc((100% / ${this.state.slideCount}) - 20px)`;
            let listItem = (
                <li style={style} key={i}>
                    <label htmlFor={i} onClick={this.changeSelection}>
                        <img src={src} alt="" />
                    </label>
                </li>
            );
            elements.push(listItem);
        }
        return <ul className="carousel__thumbnails">{elements}</ul>;
    }

    renderArrows() {
        let leftArrow = (
            <a href="#" onClick={this.decrement}>
                left
            </a>
        );
        let rightArrow = (
            <a href="#" onClick={this.increment}>
                right
            </a>
        );
        return { leftArrow, rightArrow };
    }

    render() {
        let inputs = this.renderInputs();
        let slides = this.renderSlides();
        let thumbnails = this.renderThumbnails();
        // let { leftArrow, rightArrow } = this.renderArrows();
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
