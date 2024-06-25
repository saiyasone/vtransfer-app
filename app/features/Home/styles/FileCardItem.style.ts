import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  fileItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  fileName: {
    fontSize: 16,
  },
  filePath: {
    fontSize: 12,
    color: '#888',
  },
  permission: {
    fontSize: 16,
    color: '#888',
  },
  imageContainer: {
    // alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 6,
    position: 'relative',
    borderRadius: 6,
    overflow: 'hidden',
    flex: 1,
    padding: 12,
  },
  image: {
    maxWidth: '100%',
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 6,
  },
});

export default styles;
