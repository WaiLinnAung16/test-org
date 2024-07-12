import * as FileSystem from "expo-file-system";

// Define the type for your data
type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const writeToFile = async (
  filename: string,
  data: Product[]
): Promise<void> => {
  const fileUri = FileSystem.documentDirectory + filename;

  try {
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
    console.log("File written successfully");
  } catch (error) {
    console.error("Error writing file:", error);
  }
};

const readFromFile = async (filename: string): Promise<Product[] | null> => {
  const fileUri = FileSystem.documentDirectory + filename;

  try {
    const fileContents = await FileSystem.readAsStringAsync(fileUri);
    const data: Product[] = JSON.parse(fileContents);
    console.log("File read successfully:", data);
    return data;
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
};

const appendToFile = async (
  filename: string,
  newData: Product
): Promise<void> => {
  const fileUri = FileSystem.documentDirectory + filename;

  try {
    const fileContents = await FileSystem.readAsStringAsync(fileUri);
    const data: Product[] = JSON.parse(fileContents);
    data.push(newData);
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
    console.log("Data appended successfully");
  } catch (error) {
    console.error("Error appending data:", error);
  }
};

export { writeToFile, readFromFile, appendToFile, Product };
