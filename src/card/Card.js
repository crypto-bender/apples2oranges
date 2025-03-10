import React from 'react';
// import PropTypes from 'prop-types';
import styles from './Card.module.css';
import { ListItemText } from '@mui/material';
import {
  TwitterShareButton, TwitterIcon,
  FacebookShareButton, FacebookIcon,
  RedditShareButton, RedditIcon,
} from "react-share";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSelect = () => {
    if (this.props.player) {
      this.props.moves.playAnswer(this.props.playerId);
    } else {
      console.log('selected player id: ', this.props.playerId);
      this.props.moves.pickWinner(this.props.playerId);
      this.props.setRoundTime(60);
    }
  }
  render() {
    const shareTitle = 'Apples to Oranges!';
    const shareMessage = `I'm playing Apples to Oranges and found this hilarious!\n${this.props.text}`;
    const url = String(window.location);
    
  

    return (
      <div
        id={this.props.id}
        draggable="true"
        className={styles.answer_card}
      >
        <div className={styles.card_text}>
          {this.props.text}
        </div>
        <button className={styles.select_button} onClick={this.handleSelect.bind(this)}>
          Select
        </button>
        <div className={styles.social_media}>
          <TwitterShareButton url={url} title={shareTitle} via={shareMessage}>
            <TwitterIcon size="1.3em" round/>
          </TwitterShareButton>
          <FacebookShareButton url={url} quote={shareMessage}>
            <FacebookIcon size="1.3em" round/>
          </FacebookShareButton>
          <RedditShareButton url={url} title={shareMessage}>
            <RedditIcon size="1.3em" round/>
          </RedditShareButton>
        </div>
      </div>
    )
  }
};
