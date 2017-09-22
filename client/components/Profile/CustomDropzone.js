import Dropzone from 'react-dropzone';
import { Columns, Column, Button, Hero, Input, HeroBody, Container } from 're-bulma';


export default function CustomDropzone(props) {
  return (
    <Dropzone onDrop={props.onDrop} className="dropzone">
      <div className="profile-upload-area">
        <Hero style={{ backgroundColor: 'inherit' }}>
          <HeroBody>
            <Container>
              <span className="dropzone-header">Drag an image here, or...</span>
              <br /><br />
              <hr />
              <br />
              <Button color="isPrimary">
                Upload an Image
              </Button>
              <br /><br />
              <hr />
              <br />
              <span className="dropzone-subtitle">Use an image from the Web</span>
              <div className="dropzone-from-url">
                <Columns>
                  <Column size={props.url ? 'is9' : 'is12'}>
                    <Input placeholder="http://" value={props.urlImage} onChange={props.handleUrlChange} />
                  </Column>
                  {props.url &&
                    <Column>
                      <Button>Download</Button>
                    </Column>
                  }
                </Columns>
              </div>
            </Container>
          </HeroBody>
        </Hero>
      </div>
    </Dropzone>
  );
}
