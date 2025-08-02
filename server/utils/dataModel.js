const fs = require('fs');
const uuidv4 = require('uuid');


// Emulate database model work using file inside "/data" folder

class DataModel {

    constructor(datafile){
        this._file_path = `./data/${datafile}`
    }

    // Find operation. Returns all data from file
    async find(){
        return await this.getFile()        
    }

    // Find  by ID operation. Returns object by id from the file
    async findById(id){
        
        let _data = await this.getFile()
        return _data.find(x => x.id == id)
    }

    // Find  by ID and update the record
    async findByIdAndUpdate(id, item){
       
        let _data = await this.getFile()
        let _item = _data.find(x => x.id = id)
        let _new_data = _data.filter(x => x.id != id)
        
        item.id = _item.id
        item.created_date = _item.created_date

        _new_data.push(item)
     
        await this.writeFile(_new_data)

        return item
    }

    // Find  by ID and delete the record
    async findByIdAndDelete(id){
        
        let _data = await this.getFile()
        let _new_data = _data.filter(x => x.id != id)
        return await this.writeFile(_new_data)
    }

    // Create a record in the file
    async create(item){
        
        let _data = await this.getFile()

        item.id = uuidv4.v4()        
        _data.push(item)
        
        let created = await this.writeFile(_data)

        if(created){
            return item
        }

        return null
    }

    // Get selected file
    async getFile(){

        let _data

        try{
            _data = JSON.parse(await fs.promises.readFile(this._file_path, "utf8"))

        }catch(ex){
            console.log(ex)
            throw(`Cannot retrieve data from the selected file with path: ${this._file_path}`)
        }

        return _data
    }

    // Update selected file
    async writeFile(data){

        let isUpdated = false

        try{
            await fs.promises.writeFile(this._file_path, JSON.stringify(data), 'utf8')
            isUpdated = true
        }catch(ex){
            console.log(ex)
            throw(`Cannot write data to file with path: ${this._file_path}`)
        }

        return isUpdated
    }
}

module.exports = DataModel;