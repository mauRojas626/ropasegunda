import { CRow, CCol, CInput, CFormGroup, CLabel, CInputGroup, CInputGroupPrepend, CInputGroupText, CSelect, CButton, CLink } from '@coreui/react'
import React, { Component } from 'react'
import FileUpload from 'src/views/dropzone/FileUpload';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ClothesModel from '../../../services/models/PrendaModel'
import * as clothesActions from '../../../services/redux/actions/prenda'
import MedidaModel from 'src/services/models/MedidaModel';


class NuevaPrenda extends Component {
    constructor(props){
        super(props);
        this.state = {
            clothes: new ClothesModel(), 
            size: new MedidaModel(),
            files: [],
            categoria: 'Saco',
            sexo: 0,
            fin:false
        }
    }
    
    onChange = (key, isNumeric = false, isDate = false) => (e) => {
        const { clothes } = this.state;
        const { value } = e.target;

        const val = isNumeric ? parseInt(value || '0') : isDate ? e.target.value : e.target.value;
        let updatedClothes = { ...clothes };
        updatedClothes[key] = val;
        console.log(clothes)
        this.setState({clothes: updatedClothes});
    }

    onChangeMedida = (key, isNumeric = false, isDate = false) => (e) => {
        const { size } = this.state;
        const { value } = e.target;

        const val = isNumeric ? parseInt(value || '0') : isDate ? e.target.value : e.target.value;
        let updatedClothes = { ...size };
        updatedClothes[key] = val;
        this.setState({size: updatedClothes});
    }

    onChangeSelect = () => (e) => {
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
        const { files } = this.state
        let updateFiles = [ ...files, ...photos ]
        this.setState({files: updateFiles})
    }

    onRemovePhoto = (filename) => {
        const { files } = this.state;
        let updateFiles = files.filter(file => file.name !== filename)
        console.log(updateFiles)
        this.setState({ files: updateFiles })
    }

    onSubmit = async () => {
        
        const formData = new FormData();
        const { clothes, size } = this.state;
        let finalClothes = { ...clothes }
        finalClothes.idMedida = size 
        formData.append('clothes', JSON.stringify(finalClothes));
        this.state.files.forEach((file, index) => {
            const newFileName = `${Date.now()}_${file.name}`
            formData.append('files', file, newFileName)    
        });
        await this.props.createClothes(formData)
    }

    render() {
    
    return (
        <CCol>
            <CRow>
                <CCol md="6">
                    <CFormGroup className="mt-3">
                        <CLabel type='text'>Nombre</CLabel>
                        <CInput id="name" placeholder="Ingrese el nombre de la prenda" required onChange={this.onChange('nombre')}/>
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel type='text'>Color</CLabel>
                        <CInput id="color" placeholder="Ingrese el color" required onChange={this.onChange('color')}/>
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
                            <CInput id="cintura" name="cintura" placeholder="cm" onChange={this.onChangeMedida('cintura')}/>
                        </CInputGroup>
                        <CInputGroup className="m-2">
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    busto (cm)
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput id="busto" name="busto" placeholder="cm" onChange={this.onChangeMedida('busto')}/>
                        </CInputGroup>
                        <CInputGroup className="m-2">
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    cadera (cm)
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput id="cadera" name="cadera" placeholder="cm" onChange={this.onChangeMedida('cadera')}/>
                        </CInputGroup>
                        <CInputGroup className="m-2">
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    largo (cm)
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput id="largo" name="largo" placeholder="cm" onChange={this.onChangeMedida('largoTotal')}/>
                        </CInputGroup>
                        <CInputGroup className="m-2">
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    largo mangas (cm)
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput id="mangas" name="margas" placeholder="cm" onChange={this.onChangeMedida('largoMangas')}/>
                        </CInputGroup>
                        <CInputGroup className="m-2">
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    hombro a hombro (cm)
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput id="hombro" name="hombro" placeholder="cm" onChange={this.onChangeMedida('hombros')}/>
                        </CInputGroup>
                    </CCol>
                </CCol>
                <CCol md="6">
                    <CFormGroup className="mt-3">
                        <CLabel type='number'>Precio</CLabel>
                        <CInput id="precio" placeholder="Ingrese el precio de la prenda" required onChange={this.onChange('precio')}/>
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel type='text'>Talla</CLabel>
                        <CInput id="talla" placeholder="Ingrese la talla de la prenda" required onChange={this.onChange('talla')}/>
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel>Categoría</CLabel>
                        <CSelect custom name="categoria" id="categoria" onChange={this.onChangeSelect('categoria')} value={this.state.categoria}>
                        <option value="Saco">Saco</option>
                        <option value="Polo">Polo</option>
                        <option value="Pantalón">Pantalón</option>
                        <option value="Casaca">Casaca</option>
                        <option value="Polera">Polera</option>
                        <option value="Top">Top</option>
                        <option value="Vestido">Vestido</option>
                        <option value="Blusa">Blusa</option>
                        <option value="Accesorios">Accesorios</option>
                        <option value="Otros">Otros</option>
                        </CSelect>
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel type='text'>Marca</CLabel>
                        <CInput id="marca" placeholder="Ingrese la marca de la prenda" required onChange={this.onChange('marca')}/>
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel type='text'>Material</CLabel>
                        <CInput id="material" placeholder="Ingrese el material de la prenda" required onChange={this.onChange('material')}/>
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel type='text'>Detalles</CLabel>
                        <CInput id="detalle" placeholder="Ingrese los detalles de la prenda" required onChange={this.onChange('detalles')}/>
                    </CFormGroup>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <span>fotos</span>
                    <CCol xs="12" sm="12" className="m-auto">
                        <FileUpload modo="fotos" newPhoto={this.onAddPhotos} removePhoto={this.onRemovePhoto}></FileUpload>
                    </CCol>
                </CCol>
            </CRow>
            <CRow className="mb-4">
                <CCol md="4" className="m-auto">
                    <CButton color='primary' block onClick={this.onSubmit}>
                        <CLink to={'/prendas'}>
                        Publicar
                        </CLink>
                    </CButton>
                </CCol>
                
            </CRow>
        </CCol>
    )
  }
}

const mapStateToProps = state => {
    return {
        clothes: state.prenda.clothes
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(Object.assign({},clothesActions), dispatch)
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(NuevaPrenda)