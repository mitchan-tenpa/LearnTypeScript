import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { 
  styled,
  css,
  globalCss,
  keyframes,
  theme,
  createTheme,
  getCssText,
} from '/stitches.config'
import { useState, useCallback } from 'react';
import React from 'react';
import { violet, mauve, blackA } from '@radix-ui/colors';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { isTargetLikeServerless } from 'next/dist/server/config';

const SCROLLBAR_SIZE = 10;

const StyledScrollArea = styled(ScrollAreaPrimitive.Root, {
  width: 200,
  height: 225,
  borderRadius: 4,
  overflow: 'hidden',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
});

const StyledViewport = styled(ScrollAreaPrimitive.Viewport, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
});

const StyledScrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  padding: 2,
  background: blackA.blackA6,
  transition: 'background 160ms ease-out',
  '&:hover': { background: blackA.blackA8 },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },
});

const StyledThumb = styled(ScrollAreaPrimitive.Thumb, {
  flex: 1,
  background: mauve.mauve10,
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  },
});

const StyledCorner = styled(ScrollAreaPrimitive.Corner, {
  background: blackA.blackA8,
});

// Exports
const ScrollArea = StyledScrollArea;
const ScrollAreaViewport = StyledViewport;
const ScrollAreaScrollbar = StyledScrollbar;
const ScrollAreaThumb = StyledThumb;
const ScrollAreaCorner = StyledCorner;

// Your app...
const Box = styled('div', {});
const Text = styled('div', {
  color: violet.violet11,
  fontSize: 15,
  lineHeight: '18px',
  fontWeight: 500,
});
const Tag = styled('div', {
  color: mauve.mauve12,
  fontSize: 13,
  lineHeight: '18px',
  marginTop: 10,
  borderTop: `1px solid ${mauve.mauve6}`,
  paddingTop: 10,
});

const TAGS = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

//TypeScript
const name = "hello";
let nameChange = "hello";
nameChange = "hello2";

interface NAME {
  first: string;
  last: string | null;
}

let nameObj: NAME = { first: "Yamada", last: null};

//stitches
const Button = styled('button', {
  backgroundColor: 'gainsboro',
  borderRadius: '9999px',
  fontSize: '50px',
  padding: '10px 15px',
  margin: "50px",
  '&:hover': {
    backgroundColor: 'lightgray',
  },
  '&.custom-class': {
    boxShadow: '0 0 0 3px blueviolet',
  },
  '& + button': {
    marginLeft: '50px',
  },
  variants: {
    color: {
      violet: {
        backgroundColor: 'blueviolet',
        color: 'white',
        '&:hover': {
          backgroundColor: 'darkviolet',
        },
      },
      gray: {
        backgroundColor: 'gainsboro',
        '&:hover': {
          backgroundColor: 'lightgray',
        },
      },
    },
  },
});

const ScrollAreaDemo: NextPage = () => {
  const [ text, setText] = useState("");
  const [ tasks, setTasks] = useState([]);

  const handleChange = useCallback((e) => {
    setText(e.target.value.trim());
  }, []);
  
  const submitForm = (e: any) => {
    e.preventDefault();
    addTask(text);
    // console.log(text);
  }

  const addTask = (text: string) => {
    setTasks([...tasks, text]);
    // console.log(text);
  
    
  }

  // const members = [1,2,3,4];
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form 
          onSubmit={submitForm}
        >
          <div>
            <input type="text" value={text} onChange={handleChange}></input>
            <div>
              {
                tasks.map((text, index) => {
                return <div key={index}>{tasks}</div>
                })
              }
            </div>
          </div>
          <div>
            <Button className="custom-class">
              R button
            </Button>
            <Button className="custom-class">
              L button
            </Button>
          </div>
        </form>

        <ScrollArea>
            <ScrollAreaViewport css={{ backgroundColor: 'white' }}>
              <Box style={{ padding: '15px 20px' }}>
                <Text>Tags</Text>
                {TAGS.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Box>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar orientation="vertical">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
            <ScrollAreaScrollbar orientation="horizontal">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
            <ScrollAreaCorner />
        </ScrollArea>
      </main>
    </div>   
  )
}

export default ScrollAreaDemo;
