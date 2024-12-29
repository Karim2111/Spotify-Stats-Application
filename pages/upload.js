import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { processAll } from './upload/upload.js';

export default function Home() {
  const handleButtonClick = () => {
    // Trigger the click event of the hidden file input
    document.getElementById('upload-files').click();
  };
  const handleUpload = (event) => {
    const files = event.target.files;


    processAll(files);
    

      


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
