import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {processLargeJsonFile} from './upload/upload.js';

export default function Home() {
  const handleButtonClick = () => {
    // Trigger the click event of the hidden file input
    document.getElementById('upload-json').click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('File uploaded:', file.name);  // Log the uploaded file name
      processLargeJsonFile(file);  // Call the function to process the uploaded file
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Upload File - Next.js</title>
      </Head>

      <main>
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleButtonClick} className={styles.button}>
            Upload File
          </button>
          <input
            id="upload-json"
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            style={{ display: 'none' }} // Hide the input
          />
        </div>
      </main>
    </div>
  );
}
