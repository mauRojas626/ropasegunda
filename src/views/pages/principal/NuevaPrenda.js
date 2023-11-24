import { CRow, CCol, CInput, CFormGroup, CLabel, CInputGroup, CInputGroupPrepend, CInputGroupText, CSelect, CButton, CModal, CModalTitle, CModalBody, CModalFooter, CModalHeader } from '@coreui/react'
import React, { Component } from 'react'
import FileUpload from 'src/views/dropzone/FileUpload';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PrendaModel from '../../../services/models/PrendaModel'
import * as clothesActions from '../../../services/redux/actions/prenda'
import MedidaModel from 'src/services/models/MedidaModel';
import { Link } from 'react-router-dom';

class NuevaPrenda extends Component {
    constructor(props){
        super(props);
        this.state = {
            clothes: new PrendaModel(), 
            size: new MedidaModel(),
            files: [],
            removeFiles: [],
            oldFiles: [],
            newFiles: [],
            categoria: 'Blusa',
            sexo: 0,
            confirmacion: false,
            error: {}
        }
    }

    componentDidMount(){
        if(this.props.location.state){
            let files = this.props.location.state.prenda.fotos.map((file, index) => {
                return {...file, name: file.nombre}
            })
            this.setState({clothes: this.props.location.state.prenda, sexo: this.props.location.state.prenda.sexo, categoria: this.props.location.state.prenda.categoria,
            files: files, oldFiles: files, size: this.props.location.state.prenda.idMedida})
        }
    }
    
    onChange = (key, isNumeric = false, isDate = false) => (e) => {
        const { clothes } = this.state;
        const { value } = e.target;

        const val = isNumeric ? parseInt(value || '0') : isDate ? e.target.value : e.target.value;
        let updatedClothes = { ...clothes };
        updatedClothes[key] = val;
        this.setState({clothes: updatedClothes});
    }

    onChangeMedida = (key, isNumeric = false) => (e) => {
        const { size } = this.state;
        const { value } = e.target;

        const val = isNumeric ? parseInt(value || '0') : e.target.value;
        let updatedClothes = { ...size };
        updatedClothes[key] = val;
        this.setState({size: updatedClothes});
    }

    onChangeSelect = (key) => (e) => {
        const { clothes } = this.state;
        const value = e.target.value;
        let updatedClothes = { ...clothes };
        updatedClothes.categoria = value;
        this.setState({clothes: updatedClothes, categoria: value});
    }

    onChangeSelectSexo = () => (e) => {
        const { clothes } = this.state;
        const value = e.target.value;
        let updatedClothes = { ...clothes };
        updatedClothes.sexo = value;
        this.setState({clothes: updatedClothes, sexo: value});
    }

    onAddPhotos = (photos) => {
        const { files, newFiles } = this.state
        let updateFiles = [ ...files, ...photos ]
        let updateNewFiles = [ ...newFiles, ...photos ]
        this.setState({files: updateFiles, newFiles: updateNewFiles})
    }

    onRemovePhoto = (filename) => {
        const { files } = this.state;
        
        let updateFiles = files.filter(file => file.name !== filename)
        if(this.state.oldFiles.find(file => file.nombre === filename)){
            this.setState({removeFiles: [...this.state.removeFiles, filename]})
        }
        this.setState({ files: updateFiles })
    }

    validateForm = () => {
        let error = {}
        const { clothes } = this.state;
        const { nombre, precio, talla, color, detalle, descripcion } = clothes;
        if(nombre === ''){
            error.nombre = 'Ingrese el nombre de la prenda'
        }
        if(precio === '' || precio <= 0 || isNaN(parseFloat(precio))){
            error.precio = 'Ingrese el precio de la prenda válido'
        }
        if(talla === ''){
            error.talla = 'Ingrese la talla de la prenda'
        }
        if(color === ''){
            error.color = 'Ingrese el color de la prenda'
        }
        if(detalle !== 'Ninguno' && descripcion === ''){
            error.detalle = 'Ingrese la descripción del detalle'
        }
        if(this.state.files.length <= 0){
            error.fotos = '  Ingrese al menos una foto'
        }
        this.setState({error: error})
        return error
    }

    onSubmit = async () => {
        let error = this.validateForm()
        if(Object.keys(error).length === 0){
            const formData = new FormData();
            const { clothes, size } = this.state;
            for (const key in size) {
                if (size[key] === "") {
                size[key] = 0;
                }
            }
            let finalClothes = { ...clothes }
            finalClothes.idMedida = size 
            finalClothes.idVendedor = this.props.user.idUsuario
            finalClothes.deletedFiles = this.state.removeFiles
            formData.append('clothes', JSON.stringify(finalClothes));
            this.state.newFiles.forEach((file, index) => {
                const newFileName = `${Date.now()}_${file.name}`
                formData.append('files', file, newFileName)    
            });
            if(this.state.oldFiles.length <= 0){
                await this.props.createClothes(formData)
            } else {
                await this.props.updateClothes(formData)
            }
            this.setState({confirmacion: true, clothes: new PrendaModel(), size: new MedidaModel(), files: []})
        }
    }

    render() {
    let files = []
    if(this.props.location.state !== undefined) {
        files = this.props.location.state.prenda.fotos.map((file, index) => {
            return {...file, name: file.nombre}
        })
    } else {
        files = this.state.files
    }
    return (
        <>
        <CCol>
            <CRow>
                <CCol md="6">
                    <CFormGroup className="mt-3">
                        <CLabel type='text'>Nombre</CLabel>
                        <CInput id="name" placeholder="Ingrese el nombre de la prenda" required onChange={this.onChange('nombre')} value={this.state.clothes.nombre}/>
                        <span className="text-danger">{this.state.error.nombre}</span>
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel type='text'>Color</CLabel>
                        <CInput id="color" placeholder="Ingrese el color" required onChange={this.onChange('color')} value={this.state.clothes.color}/>
                        <span className="text-danger">{this.state.error.color}</span>
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel>Sexo</CLabel>
                        <CSelect custom name="sexo" id="sexo" onChange={this.onChangeSelectSexo('sexo')} value={this.state.sexo}>
                            <option value={0}>Mujer</option>
                            <option value={1}>Hombre</option>
                        </CSelect>
                    </CFormGroup>
                    <span>Medidas</span>
                    <CCol md="12">
                        <CInputGroup className="m-2">
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    cintura (cm)
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput id="cintura" name="cintura" placeholder="cm" onChange={this.onChangeMedida('cintura')} value={this.state.size.cintura}/>
                        </CInputGroup>
                        <CInputGroup className="m-2">
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    busto (cm)
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput id="busto" name="busto" placeholder="cm" onChange={this.onChangeMedida('busto')} value={this.state.size.busto}/>
                        </CInputGroup>
                        <CInputGroup className="m-2">
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    cadera (cm)
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput id="cadera" name="cadera" placeholder="cm" onChange={this.onChangeMedida('cadera')} value={this.state.size.cadera}/>
                        </CInputGroup>
                        <CInputGroup className="m-2">
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    largo (cm)
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput id="largo" name="largo" placeholder="cm" onChange={this.onChangeMedida('largoTotal')} value={this.state.size.largoTotal}/>
                        </CInputGroup>
                        <CInputGroup className="m-2">
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    largo mangas (cm)
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput id="mangas" name="margas" placeholder="cm" onChange={this.onChangeMedida('largoManga')} value={this.state.size.largoManga}/>
                        </CInputGroup>
                        <CInputGroup className="m-2">
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    hombro a hombro (cm)
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput id="hombro" name="hombro" placeholder="cm" onChange={this.onChangeMedida('hombros')} value={this.state.size.hombros}/>
                        </CInputGroup>
                    </CCol>
                </CCol>
                <CCol md="6">
                    <CFormGroup className="mt-3">
                        <CLabel type='number'>Precio</CLabel>
                        <CInput id="precio" placeholder="Ingrese el precio de la prenda" required onChange={this.onChange('precio')} value={this.state.clothes.precio}/>
                        <span className="text-danger">{this.state.error.precio}</span>
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel type='text'>Talla</CLabel>
                        <CInput id="talla" placeholder="Ingrese la talla de la prenda" required onChange={this.onChange('talla')} value={this.state.clothes.talla}/>
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel>Categoría</CLabel>
                        <CSelect custom name="categoria" id="categoria" onChange={this.onChangeSelect('categoria')} value={this.state.categoria}>
                        <option value="Accesorios">Accesorios</option>
                        <option value="Blusa">Blusa</option>
                        <option value="Casaca">Casaca</option>
                        <option value="Falda">Falda</option>
                        <option value="Polo">Polo</option>
                        <option value="Pantalón">Pantalón</option>
                        <option value="Polera">Polera</option>
                        <option value="Saco">Saco</option>
                        <option value="Top">Top</option>
                        <option value="Vestido">Vestido</option>
                        <option value="Otros">Otros</option>
                        </CSelect>
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel type='text'>Marca</CLabel>
                        <CInput id="marca" placeholder="Ingrese la marca de la prenda" required onChange={this.onChange('marca')} value={this.state.clothes.marca}/>
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel type='text'>Material</CLabel>
                        <CInput id="material" placeholder="Ingrese el material de la prenda" required onChange={this.onChange('material')} value={this.state.clothes.material}/>
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel type='text'>Tipo detalle</CLabel>
                        <CSelect custom id="detalle" onChange={this.onChange('detalle')} value={this.state.clothes.detalle}>
                        <option value="Ninguno">Ninguno</option>
                        <option value="Rotura">Rotura</option>
                        <option value="Mancha">Mancha</option>
                        <option value="Incompleto">Le falta algo</option>
                        <option value="Decolorado">Decolorado</option>
                        <option value="Otros">Otro</option>
                        </CSelect>
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel type='text'>Descripción detalle</CLabel>
                        <CInput id="descripcion" placeholder="Ingrese los detalles de la prenda" required onChange={this.onChange('descripcion')} value={this.state.clothes.descripcion}/>
                    </CFormGroup>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <span>fotos</span>
                    <span className="text-danger">{this.state.error.fotos}</span>
                    <CCol xs="12" sm="12" className="m-auto">
                        <FileUpload modo="fotos" newPhoto={this.onAddPhotos} removePhoto={this.onRemovePhoto} fotosOld={this.props.location.state !== undefined ? files : []}></FileUpload>
                    </CCol>
                </CCol>
            </CRow>
            <CRow className="mb-4">
                <CCol md="4" className="m-auto">
                    <CButton color='primary' block onClick={this.onSubmit}>
                        Publicar
                    </CButton>
                </CCol>
                
            </CRow>
        </CCol>
        <CModal 
            show={this.state.confirmacion} 
            //onClose={() => this.setState({confirmacion: !this.state.confirmacion})}
            size="sm"
        >
            <CModalHeader>
            <CModalTitle>Prenda registrada</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {'Prenda registrada con éxito'}
            </CModalBody>
            <CModalFooter>
                <Link to={'/en-venta'}>
                    <CButton color="primary" onClick={() => this.setState({confirmacion: !this.state.confirmacion})}>
                        Aceptar
                    </CButton>
                </Link>
            </CModalFooter>
        </CModal>
    </>
    )
  }
}

const mapStateToProps = state => {
    return {
        clothes: state.prenda.clothes,
        user: state.auth.user
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(Object.assign({},clothesActions), dispatch)
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(NuevaPrenda)