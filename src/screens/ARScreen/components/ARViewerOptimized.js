import React, {useState, useEffect} from 'react';
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

// Tạo vật liệu mặc định
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
  const [position, setPosition] = useState([0, 0, -1]);
  const [scale, setScale] = useState([0.1, 0.1, 0.1]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [localModelPath, setLocalModelPath] = useState(null);
  const [mtlPath, setMtlPath] = useState(null);
  const [status, setStatus] = useState('Initializing...');
  const [error, setError] = useState(null);

  // Tên file MTL cố định
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

      // 1. Prepare paths
      const documentDir = RNFS.DocumentDirectoryPath;
      const mtlFilePath = `${documentDir}/${FIXED_MTL_FILENAME}`;

      // 2. Create universal MTL file if it doesn't exist
      await createUniversalMTLFile(mtlFilePath);
      setMtlPath(mtlFilePath);

      // 3. Download and prepare the OBJ model
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
      // Clean and decode the URL
      const decodedUrl = decodeURIComponent(url);
      const cleanUrl = decodedUrl.split('?')[0];
      const originalFileName = cleanUrl.substring(
        cleanUrl.lastIndexOf('/') + 1,
      );

      // Create safe filename
      const safeFileName = originalFileName.replace(/[^a-zA-Z0-9._-]/g, '_');
      const localPath = `${documentDir}/${safeFileName}`;
      const modifiedPath = `${documentDir}/modified_${safeFileName}`;

      setStatus(`Downloading model: ${originalFileName}`);

      // Download the file if it doesn't exist
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

        if (!(await RNFS.exists(localPath))) {
          throw new Error('Download failed - file not created');
        }
      }

      // Read and modify the OBJ file
      let objContent = await RNFS.readFile(localPath, 'utf8');

      // Update MTL reference
      const mtlRegex = /mtllib .*\.mtl/;
      if (mtlRegex.test(objContent)) {
        objContent = objContent.replace(
          mtlRegex,
          `mtllib ${FIXED_MTL_FILENAME}`,
        );
      } else {
        objContent = `mtllib ${FIXED_MTL_FILENAME}\n${objContent}`;
      }

      // Write modified file
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

  // Xử lý kéo thả
  const handleDrag = dragToPos => {
    setPosition(dragToPos);
  };

  // Xử lý pinch zoom
  const handlePinch = (pinchState, scaleFactor) => {
    if (pinchState === 3) {
      // STATE_CHANGED
      setScale([
        scale[0] * scaleFactor,
        scale[1] * scaleFactor,
        scale[2] * scaleFactor,
      ]);
    }
  };

  // Xử lý xoay
  const handleRotate = (rotateState, rotationFactor) => {
    if (rotateState === 3) {
      // STATE_CHANGED
      setRotation([rotation[0], rotation[1] - rotationFactor, rotation[2]]);
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {/* Ánh sáng */}
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

      {/* Hiển thị model 3D */}
      {showObject && localModelPath && mtlPath && (
        <ViroARPlaneSelector>
          <Viro3DObject
            source={{uri: `file://${localModelPath}`}}
            resources={[{uri: `file://${mtlPath}`}]}
            position={position}
            scale={scale}
            rotation={rotation}
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
