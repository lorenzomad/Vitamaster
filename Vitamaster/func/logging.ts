import * as FileSystem from 'expo-file-system'

// path to save the file
const path: string = FileSystem.documentDirectory + '/data'
const filename:string = 'data.txt'

const logDay = async (date: Date) => {
    //function that logs the current date to the file
    const dateString: string = date.toString()

    let fileExists: boolean = (await FileSystem.getInfoAsync(path)).exists
    // check if the file exists otherwise let's create it
    if( fileExists == false) {
        try {
            await FileSystem.StorageAccessFramework.createFileAsync(path, filename, 'text/plain')
        } catch (error) {
            console.log(error)
            
        }
    }

    try {
        await FileSystem.writeAsStringAsync(path, dateString)
    } catch (error) {
        console.log(error)
    }
}

export {logDay}