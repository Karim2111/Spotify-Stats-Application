import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { processLargeJsonFile } from './upload/upload.js';

export default function Home() {
  const handleButtonClick = () => {
    // Trigger the click event of the hidden file input
    document.getElementById('upload-files').click();
  };
  const handleUpload = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      console.log('Files contents uploaded:');

      

      Array.from(files).forEach((file) => {
        if (file.type !== 'application/json') {
          console.error(`File type not supported: ${file.type}`);
          return;
        }

        console.log(`File: ${file.name}`);
        processLargeJsonFile(file);
        
        
      });

    }
  };
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Upload Files - Next.js</title>
      </Head>

      <main>
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleButtonClick} className={styles.button}>
            Upload Files
          </button>
          <input
            id="upload-files"
            type="file"
            multiple // Allow multiple file selection
            onChange={handleUpload}
            style={{ display: 'none' }} // Hide the input
          />
        </div>
      </main>
    </div>
  );
}
