import Head from 'next/head'; // Correct import statement for Head
import { useEffect, useState } from 'react';
import { Button, Form, Grid, Header, Message, Radio, Segment } from 'semantic-ui-react';

export default function Home() {
  const [dynamicUrl, setDynamicUrl] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
  const url = window.location.origin.replace('localhost', '127.0.0.1') +
    '/api/tvtelugu';

  setDynamicUrl(url);
}, []);

  function downloadM3uFile(filename) {
    setDownloading(true);
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(window.location.origin + '/api/tvtelugu', requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        const data = result;
        const blob = new Blob([data], { type: 'text/plain' });
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveBlob(blob, filename);
        }
        else {
          const elem = window.document.createElement('a');
          elem.href = window.URL.createObjectURL(blob);
          elem.download = filename;
          document.body.appendChild(elem);
          elem.click();
          document.body.removeChild(elem);
        }
        setDownloading(false);
      })
      .catch(error => {
        console.log('error', error);
        setDownloading(false);
      });
  }

  return (
    <div>
      <Head>
        <title> 🕊𝐓𝐕𝐓𝐞𝐥𝐮𝐠𝐮™ || TP Iptv Playlist</title>
        <meta
          name="description"
          content="TVTelugu"
        />
      </Head>
      <Grid columns='equal' padded centered>
        <Grid.Row>
          <Grid.Column></Grid.Column>
          <Grid.Column computer={8} tablet={12} mobile={16}>
            <Segment loading={downloading}>
             <center> <Header as={'h1'}> <img src={`https://raw.githubusercontent.com/tvtelugu/IPTV-Telugu/main/tvtelugu-logo.png`} alt="tvtelugu" /> 🕊𝐓𝐕𝐓𝐞𝐥𝐮𝐠𝐮™  <p> 𝐀𝐮𝐭𝐨 𝐓𝐏 𝐏𝐥𝐚𝐲𝐥𝐢𝐬𝐭</p> </Header> </center>
              <Message>
             <center> <Message.Header> 👇 Scan or Copy Below Auto Genarated Dynamic Url 👇 </Message.Header></center>
                <center> <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(dynamicUrl)}&size=small`} alt="QR Code" /> </center>
             <p></p>
  
  <center> <p>
                  <a href={dynamicUrl}>{dynamicUrl}</a>
   </p> </center>
  <p></p>
  <p></p>
                <center> <p>
                 📺 Note : Works Perfect With Ott Navigator (Or) Tivimate Latest versions Only.
                </p></center>
               <center>  <p> ❗ Other players May be Work Not Tested.</p></center>
                <p>
                  ⚠️ Note : **use this playlist on Tivimate (or) OTT Navigator and set to reload data to 10 min bcz hmac expires in every 10 min for most of channels &  Enjoy!
                </p>
              <center>  <Message.Header>You cannot generate a permanent m3u file URL on localhost but you can download your m3u file: </Message.Header></center>
                         
                <center><p>
                  <Button loading={downloading} primary onClick={() => downloadM3uFile('tvtelugu.m3u')}>Download TVtelugu.m3u file</Button>
                </p> </center>
            <center>    <p> ⚠️The downloaded m3u file will be valid only for 24 hours.</p></center>
              </Message>
            </Segment>
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ display: err === '' ? 'none' : 'block' }}>
          <Grid.Column></Grid.Column>
          <Grid.Column computer={8} tablet={12} mobile={16}>
            <Message color='red'>
              <Message.Header>Error</Message.Header>
              <p>
                {err}
              </p>
            </Message>
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column></Grid.Column>
          <Grid.Column textAlign='center' computer={8} tablet={12} mobile={16}>
            <a href="https://t.me/tvtelugu" target="_blank" rel="noreferrer">🕊𝐌𝐚𝐝𝐞💚𝐌𝐚𝐝𝐡𝐮™</a> || 
            <a href="https://tvtelugu.github.io" target="_blank" rel="noreferrer">🏠𝐇𝐨𝐦𝐞</a>
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}
