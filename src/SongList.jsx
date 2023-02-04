import React, { useState } from 'react';
import { Button, Radio, Tooltip, Input, theme } from 'antd';
import { LaptopOutlined, AudioOutlined, UserOutlined } from '@ant-design/icons';
import { Howl } from 'howler';
import Song from './Song.jsx';

const SongList = (props) => {

  var sound1 = new Howl({
    src: ['/MP3/BrainStew.mp3'],
    html5: true
  });
  var sound2 = new Howl({
    src: ['/MP3/FirstOfTheYear.mp3'],
    html5: true
  });
  var sound3 = new Howl({
    src: ['/MP3/SelfEsteem.mp3'],
    html5: true
  });
  var sound4 = new Howl({
    src: ['/MP3/UnderTheBridge.mp3'],
    html5: true
  });
  var sound5 = new Howl({
    src: ['/MP3/Zombie.mp3'],
    html5: true
  });

  const songArray = [sound1, sound2, sound3, sound4, sound5];
  return (
    <div>
      {songArray.map((song) => {
        return <Song currentSong={song}/>
      })}
    </div>
  );
};

export default SongList;