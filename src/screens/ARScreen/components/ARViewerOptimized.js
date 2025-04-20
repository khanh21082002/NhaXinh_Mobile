import React, {useState, useEffect, useRef} from 'react';
import {
  ViroARScene,
  ViroTrackingStateConstants,
  Viro3DObject,
  ViroAmbientLight,
  ViroMaterials,
  ViroSpotLight,
  ViroText,
  ViroARPlaneSelector,
} from '@reactvision/react-viro';
import RNFS from 'react-native-fs';
import {StyleSheet} from 'react-native';

ViroMaterials.createMaterials({
  defaultMaterial: {
    lightingModel: 'Blinn',
    diffuseColor: '#CCCCCC',
    shininess: 0.5,
    writesToDepthBuffer: true,
    readsFromDepthBuffer: true,
  },
});

const ARViewerWithGestures = ({model3DUrl}) => {
  const [isTracking, setIsTracking] = useState(false);
  const [showObject, setShowObject] = useState(false);
  const [status, setStatus] = useState('Initializing...');
  const [error, setError] = useState(null);
  const [localModelPath, setLocalModelPath] = useState(null);
  const [mtlPath, setMtlPath] = useState(null);

  const positionRef = useRef([0, 0, -1]); // Use useRef for position
  // const scaleRef = useRef([0.1, 0.1, 0.1]); // Use useRef for scale
  const [scale, setScale] = useState([0.1, 0.1, 0.1]);
  const rotationRef = useRef([0, 0, 0]); // Use useRef for rotation

  const FIXED_MTL_FILENAME = 'universal_material.mtl';

  useEffect(() => {
    if (model3DUrl) {
      prepareModelAndMTL();
    }
  }, [model3DUrl]);

  const prepareModelAndMTL = async () => {
    if (!model3DUrl) {
      setError('No model URL provided');
      return;
    }

    try {
      setStatus('Preparing model...');
      setError(null);

      const documentDir = RNFS.DocumentDirectoryPath;
      const mtlFilePath = `${documentDir}/${FIXED_MTL_FILENAME}`;
      await createUniversalMTLFile(mtlFilePath);
      setMtlPath(mtlFilePath);

      const modelPath = await downloadAndPrepareModel(model3DUrl, documentDir);
      setLocalModelPath(modelPath);

      setShowObject(true);
      setStatus('Model ready');
    } catch (err) {
      console.error('Model preparation error:', err);
      setError(`Failed to load model: ${err.message}`);
      setStatus('Error loading model');
    }
  };

  const createUniversalMTLFile = async filePath => {
    try {
      const fileExists = await RNFS.exists(filePath);
      if (!fileExists) {
        const mtlContent = `
# Universal Material File for AR Models
# Created for use with various OBJ files

newmtl Wood__Floor
Ka 0.2 0.1 0.0
Kd 0.6 0.3 0.1
Ks 0.1 0.1 0.1
Ns 10.0
illum 2

newmtl default
Ka 0.2 0.2 0.2
Kd 0.8 0.8 0.8
Ks 0.5 0.5 0.5
Ns 50.0
illum 2

newmtl FrontColor
Ka 0.0 0.0 0.0
Kd 1.0 1.0 1.0
Ks 0.0 0.0 0.0
illum 2

newmtl metal
Ka 0.1 0.1 0.1
Kd 0.7 0.7 0.7
Ks 1.0 1.0 1.0
Ns 100.0
illum 2

newmtl glass
Ka 0.0 0.0 0.0
Kd 0.1 0.1 0.1
Ks 1.0 1.0 1.0
Ns 120.0
d 0.5
illum 2

newmtl plastic
Ka 0.0 0.0 0.0
Kd 0.5 0.5 0.5
Ks 0.7 0.7 0.7
Ns 30.0
illum 2

newmtl fabric
Ka 0.1 0.1 0.1
Kd 0.5 0.5 0.5
Ks 0.0 0.0 0.0
Ns 5.0
illum 2
        `;
        await RNFS.writeFile(filePath, mtlContent, 'utf8');
        setStatus('Created universal material file');
      }
      return filePath;
    } catch (err) {
      throw new Error(`Failed to create MTL file: ${err.message}`);
    }
  };

  const downloadAndPrepareModel = async (url, documentDir) => {
    try {
      const decodedUrl = decodeURIComponent(url);
      const cleanUrl = decodedUrl.split('?')[0];
      const originalFileName = cleanUrl.substring(
        cleanUrl.lastIndexOf('/') + 1,
      );
      const safeFileName = originalFileName.replace(/[^a-zA-Z0-9._-]/g, '_');
      const localPath = `${documentDir}/${safeFileName}`;
      const modifiedPath = `${documentDir}/modified_${safeFileName}`;

      setStatus(`Downloading model: ${originalFileName}`);
      const fileExists = await RNFS.exists(localPath);
      if (!fileExists) {
        const download = RNFS.downloadFile({
          fromUrl: url,
          toFile: localPath,
          background: true,
          progress: res => {
            const progress = (res.bytesWritten / res.contentLength) * 100;
            setStatus(`Downloading... ${progress.toFixed(0)}%`);
          },
        });
        await download.promise;
      }

      let objContent = await RNFS.readFile(localPath, 'utf8');
      const mtlRegex = /mtllib .*\.mtl/;
      if (mtlRegex.test(objContent)) {
        objContent = objContent.replace(
          mtlRegex,
          `mtllib ${FIXED_MTL_FILENAME}`,
        );
      } else {
        objContent = `mtllib ${FIXED_MTL_FILENAME}\n${objContent}`;
      }

      await RNFS.writeFile(modifiedPath, objContent, 'utf8');
      setStatus('Model prepared successfully');
      return modifiedPath;
    } catch (err) {
      throw new Error(`Model preparation failed: ${err.message}`);
    }
  };

  const onInitialized = (state, reason) => {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setIsTracking(true);
    } else {
      setIsTracking(false);
    }
  };

  const handleDrag = dragToPos => {
    positionRef.current = dragToPos;
  };

  // const handlePinch = (pinchState, scaleFactor) => {
  //   if (pinchState === 3) {
  //     scaleRef.current = [
  //       scaleRef.current[0] * scaleFactor,
  //       scaleRef.current[1] * scaleFactor,
  //       scaleRef.current[2] * scaleFactor,
  //     ];
  //   }
  // };

  const handlePinch = (pinchState, scaleFactor) => {
    if (pinchState === 3) {
      // Using the setter function to update scale state
      setScale(currentScale => [
        currentScale[0] * scaleFactor,
        currentScale[1] * scaleFactor,
        currentScale[2] * scaleFactor,
      ]);
    }
  };
  const handleRotate = (rotateState, rotationFactor) => {
    if (rotateState === 3) {
      rotationRef.current = [
        rotationRef.current[0],
        rotationRef.current[1] - rotationFactor,
        rotationRef.current[2],
      ];
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color="#ffffff" intensity={500} />
      <ViroSpotLight
        innerAngle={5}
        outerAngle={45}
        direction={[0, -1, -0.2]}
        position={[0, 5, 0]}
        color="#ffffff"
        intensity={1000}
        castsShadow={true}
      />

      {showObject && localModelPath && mtlPath && (
        <ViroARPlaneSelector>
          <Viro3DObject
            source={{uri: `file://${localModelPath}`}}
            resources={[{uri: `file://${mtlPath}`}]}
            position={positionRef.current}
            // scale={scaleRef.current}
            scale={scale}
            rotation={rotationRef.current}
            type="OBJ"
            materials={['defaultMaterial']}
            onDrag={handleDrag}
            onPinch={handlePinch}
            onRotate={handleRotate}
          />
        </ViroARPlaneSelector>
      )}

      {(error || !isTracking) && (
        <ViroText
          text={error || status}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -2]}
          style={styles.textStyle}
          color="#ff0000"
        />
      )}
    </ViroARScene>
  );
};

export default ARViewerWithGestures;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
