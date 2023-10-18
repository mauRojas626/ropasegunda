import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CInput, CCollapse, CInputCheckbox, CLabel, CFormGroup } from '@coreui/react';
import React, { Component } from 'react'
import PrendaCard from './PrendaCard';
import CIcon from '@coreui/icons-react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as clothesActions from '../../../services/redux/actions/prenda'

class Prendas extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: 0,
            clothes: [],
            url: '',
            categorias: [],
            tallas: [],
            clothesFilter: []
        }
    }

    async componentDidMount(){
        await this.props.getClothes();
        const categorias = Array.from(
            new Set(this.props.clothes.map(item => item.categoria))
        );
        const tallas = Array.from(
            new Set(this.props.clothes.map(item => item.talla))
        );
        this.setState({ clothes: this.props.clothes, categorias: categorias, tallas: tallas, clothesFilter: this.props.clothes})
    }

    onChangeCat = (e) => {
        const {categorias, clothes} = this.state
        let cat
        
        if(categorias.includes(e)){
            this.setState({
                categorias: categorias.filter(item => item !== e)
            })  
            cat = categorias.filter(item => item !== e)
        }
        else{
            this.setState({
                categorias:[ ...categorias, e]
            })
            cat = [ ...categorias, e]
        }
        
        this.setState({clothesFilter: clothes.filter(item =>
            cat.length === 0 || cat.includes(item.categoria)
          )})
    }

    render() {
        return (
            <CRow>
                <CCol sm="3">
                    <CCard>
                        <CCardHeader>
                            <strong>Filtros</strong>
                        </CCardHeader>
                        <CCardBody className="p-0">
                            <CCard className="mb-0">
                                <CCardHeader>
                                    <CButton 
                                        block
                                        className="text-left m-0 p-0" 
                                        onClick={() => this.setState({collapse: this.state.collapse === 0 ? null : 0})}
                                    >
                                        <CIcon name='cil-chevron-bottom' className="float-right"></CIcon>
                                        Categoría
                                    </CButton>
                                </CCardHeader>
                                <CCollapse show={this.state.collapse === 0}>
                                    <CCardBody>
                                        <CRow className="g-0">
                                            <CCol className="m-0">
                                                <CInput size='sm'></CInput>
                                                {this.state.clothes.map((item, index) =>
                                                    <CFormGroup variant="checkbox" className="checkbox" key={index}>
                                                        <CInputCheckbox id={index} name={index} value={item.categoria} checked={this.state.categorias.includes(item.categoria)} onChange={()=>this.onChangeCat(item.categoria)} />
                                                        <CLabel variant="checkbox" className="form-check-label" htmlFor={index}>{item.categoria}</CLabel>
                                                    </CFormGroup>
                                                )}
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCollapse>
                            </CCard>
                            <CCard className="mb-0">
                                <CCardHeader>
                                    <CButton 
                                        block
                                        className="text-left m-0 p-0" 
                                        onClick={() => this.setState({collapse: this.state.collapse === 1 ? null : 1})}
                                    >
                                    <CIcon name='cil-chevron-bottom' className="float-right"></CIcon>
                                    Precio
                                    </CButton>
                                </CCardHeader>
                                <CCollapse show={this.state.collapse === 1}>
                                    <CCardBody>
                                        <CRow className="g-0 inline ">
                                            <CCol>
                                                <CInput size='sm' placeholder='Min' ></CInput>
                                            </CCol> {" - "}
                                            <CCol>
                                                <CInput size='sm' placeholder='Max' ></CInput>
                                            </CCol> 
                                        </CRow>
                                    </CCardBody>
                                </CCollapse>
                            </CCard>
                            <CCard className="mb-0">
                                <CCardHeader>
                                    <CButton 
                                        block
                                        className="text-left m-0 p-0" 
                                        onClick={() => this.setState({collapse: this.state.collapse === 2 ? null : 2})}
                                    >
                                    <CIcon name='cil-chevron-bottom' className="float-right"></CIcon>
                                    Calificación vendedor
                                    </CButton>
                                </CCardHeader>
                                <CCollapse show={this.state.collapse === 2}>
                                    <CCardBody>
                                        <CRow className="g-0 inline ">
                                            <CCol>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                <CInputCheckbox 
                                                    id="checkbox1" 
                                                    name="checkbox1" 
                                                    value="option1" 
                                                />
                                                <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">5 estrellas</CLabel>
                                                </CFormGroup>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                <CInputCheckbox id="checkbox2" name="checkbox2" value="option2" />
                                                <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox2">4 estrellas</CLabel>
                                                </CFormGroup>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                <CInputCheckbox id="checkbox3" name="checkbox3" value="option3" />
                                                <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox3">3 estrellas</CLabel>
                                                </CFormGroup>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                <CInputCheckbox id="checkbox3" name="checkbox3" value="option3" />
                                                <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox3">2 estrellas</CLabel>
                                                </CFormGroup>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                <CInputCheckbox id="checkbox3" name="checkbox3" value="option3" />
                                                <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox3">1 estrella</CLabel>
                                                </CFormGroup>
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCollapse>
                            </CCard>
                            <CCard className="mb-0">
                                <CCardHeader>
                                    <CButton 
                                        block
                                        className="text-left m-0 p-0" 
                                        onClick={() => this.setState({collapse: this.state.collapse === 3 ? null : 3})}
                                    >
                                    <CIcon name='cil-chevron-bottom' className="float-right"></CIcon>
                                    Medidas
                                    </CButton>
                                </CCardHeader>
                                <CCollapse show={this.state.collapse === 3}>
                                    <CCardBody>
                                        <span>Busto</span>
                                        <CRow className="g-0 inline ">
                                            <CCol>
                                                <CInput size='sm' placeholder='Min' ></CInput>
                                            </CCol> {" - "}
                                            <CCol>
                                                <CInput size='sm' placeholder='Max' ></CInput>
                                            </CCol> 
                                        </CRow>
                                        <span>Cadera</span>
                                        <CRow className="g-0 inline ">
                                            <CCol>
                                                <CInput size='sm' placeholder='Min' ></CInput>
                                            </CCol> {" - "}
                                            <CCol>
                                                <CInput size='sm' placeholder='Max' ></CInput>
                                            </CCol> 
                                        </CRow>
                                        <span>Cintura</span>
                                        <CRow className="g-0 inline ">
                                            <CCol>
                                                <CInput size='sm' placeholder='Min' ></CInput>
                                            </CCol> {" - "}
                                            <CCol>
                                                <CInput size='sm' placeholder='Max' ></CInput>
                                            </CCol> 
                                        </CRow>
                                    </CCardBody>
                                </CCollapse>
                            </CCard>
                            <CCard className="mb-0">
                                <CCardHeader>
                                    <CButton 
                                        block
                                        className="text-left m-0 p-0" 
                                        onClick={() => this.setState({collapse: this.state.collapse === 6 ? null : 6})}
                                    >
                                    <CIcon name='cil-chevron-bottom' className="float-right"></CIcon>
                                    Talla
                                    </CButton>
                                </CCardHeader>
                                <CCollapse show={this.state.collapse === 6}>
                                    <CCardBody>
                                        <CRow className="g-0 inline ">
                                            <CCol>
                                                {this.state.tallas.map((talla, index) =>
                                                    <CFormGroup variant="checkbox" className="checkbox" key={index}>
                                                        <CInputCheckbox id={index} name={index} value={talla} />
                                                        <CLabel variant="checkbox" className="form-check-label" htmlFor={index}>{talla}</CLabel>
                                                    </CFormGroup>
                                                )}
                                                
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCollapse>
                            </CCard>
                            <CCard className="mb-0">
                                <CCardHeader>
                                    <CButton 
                                        block
                                        className="text-left m-0 p-0" 
                                        onClick={() => this.setState({collapse: this.state.collapse === 4 ? null : 4})}
                                    >
                                    <CIcon name='cil-chevron-bottom' className="float-right"></CIcon>
                                    Detalles
                                    </CButton>
                                </CCardHeader>
                                <CCollapse show={this.state.collapse === 4}>
                                    <CCardBody>
                                        <CRow className="g-0 inline ">
                                            <CCol>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                <CInputCheckbox 
                                                    id="checkbox1" 
                                                    name="checkbox1" 
                                                    value="option1" 
                                                />
                                                <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Si</CLabel>
                                                </CFormGroup>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                <CInputCheckbox id="checkbox2" name="checkbox2" value="option2" />
                                                <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox2">No</CLabel>
                                                </CFormGroup>
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCollapse>
                            </CCard>
                            <CCard className="mb-0">
                                <CCardHeader>
                                    <CButton 
                                        block
                                        className="text-left m-0 p-0" 
                                        onClick={() => this.setState({collapse: this.state.collapse === 5 ? null : 5})}
                                    >
                                    <CIcon name='cil-chevron-bottom' className="float-right"></CIcon>
                                    Sexo
                                    </CButton>
                                </CCardHeader>
                                <CCollapse show={this.state.collapse === 5}>
                                    <CCardBody>
                                        <CRow className="g-0 inline ">
                                            <CCol>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                <CInputCheckbox 
                                                    id="checkbox1" 
                                                    name="checkbox1" 
                                                    value="option1" 
                                                />
                                                <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Hombre</CLabel>
                                                </CFormGroup>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                <CInputCheckbox id="checkbox2" name="checkbox2" value="option2" />
                                                <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox2">Mujer</CLabel>
                                                </CFormGroup>
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCollapse>
                            </CCard>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs="12" sm="9" className="m-auto">
                    <CRow xs="6" md="12">
                        { this.state.clothesFilter.map((prenda,index) => 
                            <CCol key={index} xs="12" sm="6" md="4" className="mb-3">
                                <PrendaCard onClick={this.onClick} key={prenda.id} prenda={prenda}></PrendaCard>
                            </CCol>
                        ) }
                    </CRow>
                </CCol>
            </CRow>
            
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Prendas)