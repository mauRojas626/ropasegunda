import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CInput, CCollapse, CInputCheckbox,
     CLabel, CFormGroup, CInputRadio, CTooltip, CSelect, CPagination } from '@coreui/react';
import React, { Component } from 'react'
import PrendaCard from './PrendaCard';
import CIcon from '@coreui/icons-react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as clothesActions from '../../../services/redux/actions/prenda'
import Loader from '../common/Loader';
import ErrorConnection from '../common/ErrorConnection';

class Prendas extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: 0,
            clothes: [],
            url: '',
            categoria: "todos",
            talla: "todos",
            allSize: [],
            allCat: [],
            precioMin: 0,
            precioMax: 1000,
            bustoMin: 0,
            bustoMax: 1000,
            caderaMin: 0,
            caderaMax: 1000,
            cinturaMin: 0,
            cinturaMax: 1000,
            alldetalles: [],
            detalles: [],
            califMax: 5,
            califMin: 0,
            sexo: [0, 1],
            orden: "1",
            isLoading: true,
            failed: false,
            currentPage: 1,
            items: 9,
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
        const detalles = Array.from(
            new Set(this.props.clothes.map(item => item.detalle))
        );
        this.props.clothes.forEach( (item) => {
            if(item.idVendedor.comentarios.length === 0) {
                item.rating = 0
            } else {
                item.rating = item.idVendedor.comentarios.reduce((a, b) => a + b.calificacion, 0) / item.idVendedor.comentarios.length
            }
        })
        this.setState({ clothes: this.props.clothes, categorias: categorias, allCat: categorias, 
            tallas: tallas, allSize: tallas, alldetalles: detalles, isLoading: this.props.isLoading, failed: this.props.failed})
        
    }

    onChangeLabel = (e) => {
        this.setState({talla: e.target.value})
    }

    onChangePrice = (e) => {
        if(e.target.placeholder === 'Min'){
            this.setState({precioMin: e.target.value})
        } else {
            this.setState({precioMax: e.target.value})
        }
    }

    onChangeSize = (e) => {
        if(e.target.placeholder === 'Min'){
            if(e.target.name === '0'){
                this.setState({bustoMin: e.target.value})
            } else if(e.target.name === '1'){
                this.setState({caderaMin: e.target.value})
            } else {
                this.setState({cinturaMin: e.target.value})
            }
        } else {
            if(e.target.name === '0'){
                this.setState({bustoMax: e.target.value})
            } else if(e.target.name === '1'){
                this.setState({caderaMax: e.target.value})
            } else {
                this.setState({cinturaMax: e.target.value})
            }
        }
    }

    onChangeCalif = (e) => {
        if(e.target.placeholder === 'Min'){
            this.setState({califMin: e.target.value})
        }
        else{
            this.setState({califMax: e.target.value})
        }
    }

    filter = () => {
        const user = this.props.user
        let medida = user.idMedida
        const genero = parseInt(user.genero)
        if(genero === 1 || genero === 0){
            this.setState({sexo: [genero]})
        }
        if(medida){
            if(medida.busto){
                this.setState({bustoMin: medida.busto - 5, bustoMax: parseInt(medida.busto) + 5})
            }
            if(medida.cadera){
                this.setState({caderaMin: medida.cadera - 5, caderaMax: parseInt(medida.cadera) + 5})
            }
            if(medida.cintura){
                this.setState({cinturaMin: medida.cintura - 5, cinturaMax: parseInt(medida.cintura) + 5})
            }
        }
    }

    ordenar = (e) => {
        this.setState({orden: e.target.value})
    }

    pagina = (e) => {
        this.setState({currentPage: e})
    }

    render() {
        const { isLoading, failed } = this.props
        const {clothes} = this.state
        
        const clothesFilter1 = clothes.filter(item => ((this.state.categoria === item.categoria || this.state.categoria === "todos") && item.precio >= this.state.precioMin && 
            item.precio <= this.state.precioMax && item.idMedida.busto >= this.state.bustoMin && item.idMedida.busto <= this.state.bustoMax && 
            item.idMedida.cadera >= this.state.caderaMin && item.idMedida.cadera <= this.state.caderaMax && item.idMedida.cintura >= this.state.cinturaMin 
            && item.idMedida.cintura <= this.state.cinturaMax && this.state.sexo.includes(item.sexo) && (this.state.talla === item.talla || this.state.talla === "todos")
            && (item.rating >= this.state.califMin && item.rating <= this.state.califMax) && (this.state.detalles.length === 0 || !this.state.detalles.includes(item.detalle)))
        )
        const clothesFilter = this.state.orden === "1" ? [...clothesFilter1].sort((a, b) => a.precio - b.precio) : this.state.orden === "2" 
            ? [...clothesFilter1].sort((a, b) => b.precio - a.precio) : this.state.orden === "3" ? [...clothesFilter1].sort((a, b) => a.rating - b.rating) : [...clothesFilter1].sort((a, b) => b.rating - a.rating)


        const totalItems = clothesFilter.length
        const currentPage = this.state.currentPage <= 0 ? 1 : this.state.currentPage
        const totalPages = Math.ceil(totalItems / this.state.items)
        const startIndex = (currentPage - 1) * this.state.items
        const endIndex = Math.min(startIndex + this.state.items - 1, totalItems - 1)
        const currentItems = clothesFilter.slice(startIndex, endIndex + 1)
        
        return (
            <>
            {failed ?
                <ErrorConnection></ErrorConnection>
                : isLoading ?
                    <Loader></Loader>
                    : 
            <CRow>
                <CCol sm="3">
                    <CCard>
                        <CCardHeader>
                            <strong>Filtros</strong>
                            {this.props.user ? 
                                <CTooltip content="Utiliza las tus medidas guardadas para busca prendas de tu medida">
                                    <CButton className="float-right m-0 p-0" onClick={this.filter} >usar mis medidas</CButton>
                                </CTooltip> : null
                            }
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
                                                <CFormGroup variant="custom-radio" className="checkbox" key="0">
                                                    <CInputRadio id={0} name={"todos"} value={"todos"} checked={this.state.categoria === "todos"} onChange={()=>this.setState({categoria: "todos"})} />
                                                    <CLabel htmlFor={0}>Todos</CLabel>
                                                </CFormGroup>
                                                {this.state.allCat.map((item, index) =>
                                                    <CFormGroup variant="custom-radio" className="checkbox" key={index}>
                                                        <CInputRadio id={index} name={index} value={item} checked={this.state.categoria === item} onChange={()=>this.setState({categoria: item})} />
                                                        <CLabel htmlFor={index}>{item}</CLabel>
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
                                                <CInput size='sm' placeholder='Min' value={this.state.precioMin} onChange={this.onChangePrice}></CInput>
                                            </CCol> {" - "}
                                            <CCol>
                                                <CInput size='sm' placeholder='Max' value={this.state.precioMax} onChange={this.onChangePrice}></CInput>
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
                                                <CInput size='sm' placeholder='Min' value={this.state.califMin} onChange={this.onChangeCalif}></CInput>
                                            </CCol> {" - "}
                                            <CCol>
                                                <CInput size='sm' placeholder='Max' value={this.state.califMax} onChange={this.onChangeCalif}></CInput>
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
                                        <span>Busto (cm)</span>
                                        <CRow className="g-0 inline ">
                                            <CCol>
                                                <CInput size='sm' id='0' name='0' placeholder='Min' value={this.state.bustoMin} onChange={this.onChangeSize}></CInput>
                                            </CCol> {" - "}
                                            <CCol>
                                                <CInput size='sm' id='1' name='0' placeholder='Max' value={this.state.bustoMax} onChange={this.onChangeSize}></CInput>
                                            </CCol> 
                                        </CRow>
                                        <span>Cadera (cm)</span>
                                        <CRow className="g-0 inline ">
                                            <CCol>
                                                <CInput size='sm' id='2' name='1' placeholder='Min' value={this.state.caderaMin} onChange={this.onChangeSize}></CInput>
                                            </CCol> {" - "}
                                            <CCol>
                                                <CInput size='sm' id='3' name='1' placeholder='Max' value={this.state.caderaMax} onChange={this.onChangeSize}></CInput>
                                            </CCol> 
                                        </CRow>
                                        <span>Cintura (cm)</span>
                                        <CRow className="g-0 inline ">
                                            <CCol>
                                                <CInput size='sm' id='4' name='2' placeholder='Min' value={this.state.cinturaMin} onChange={this.onChangeSize}></CInput>
                                            </CCol> {" - "}
                                            <CCol>
                                                <CInput size='sm' id='5' name='2' placeholder='Max' value={this.state.cinturaMax} onChange={this.onChangeSize}></CInput>
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
                                                <CFormGroup variant="custom-radio">
                                                    <CInputRadio id={0} name={0} value={"todos"} checked={this.state.talla === "todos"} onChange={this.onChangeLabel} />
                                                    <CLabel htmlFor={0}>Todos</CLabel>
                                                </CFormGroup>
                                                {this.state.allSize.map((talla, index) =>
                                                    <CFormGroup variant="custom-radio" key={index}>
                                                        <CInputRadio id={index} name={index} value={talla} checked={this.state.talla === talla} onChange={this.onChangeLabel} />
                                                        <CLabel htmlFor={index}>{talla}</CLabel>
                                                    </CFormGroup>
                                                )}
                                                
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCollapse>
                            </CCard>
                            <CCard className="mb-0">
                                <CCardHeader>
                                    <CTooltip content="Imperfectos que puede tener la prenda" placement='right'>
                                        <CButton 
                                            block
                                            className="text-left m-0 p-0" 
                                            onClick={() => this.setState({collapse: this.state.collapse === 4 ? null : 4})}
                                        >
                                        <CIcon name='cil-chevron-bottom' className="float-right"></CIcon>
                                        Detalles
                                        </CButton>
                                    </CTooltip>
                                </CCardHeader>
                                <CCollapse show={this.state.collapse === 4}>
                                    <CCardBody>
                                        <CRow className="g-0 inline ">
                                            <CCol>
                                                Excluir
                                                { this.state.alldetalles.map((item, index) => <CFormGroup variant="checkbox" className="checkbox" key={index}>
                                                    <CInputCheckbox
                                                        id={index}
                                                        name={index}
                                                        value={item}
                                                        checked={this.state.detalles.includes(item)}
                                                        onChange={() => this.setState({detalles: this.state.detalles.includes(item) ? this.state.detalles.filter(item2 => item2 !== item) : [...this.state.detalles, item]})}
                                                    />
                                                    <CLabel variant="checkbox" className="form-check-label" htmlFor={index}>{item}</CLabel>
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
                                                    value= "option1"
                                                    checked={this.state.sexo.includes(0)}
                                                    onChange={() => this.setState({sexo: this.state.sexo.includes(0) ? this.state.sexo.filter(item => item !== 0) : [...this.state.sexo, 0]})}
                                                />
                                                <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Mujer</CLabel>
                                                </CFormGroup>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                <CInputCheckbox id="checkbox2" name="checkbox2" value="option2" checked={this.state.sexo.includes(1)}
                                                    onChange={() => this.setState({sexo: this.state.sexo.includes(1) ? this.state.sexo.filter(item => item !== 1) : [...this.state.sexo, 1]})}/>
                                                <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox2">Hombre</CLabel>
                                                </CFormGroup>
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCollapse>
                            </CCard>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs="12" sm="9">
                    <CRow className="mb-2">
                        <CCol sm='5'>
                            <h6>{"Se encontraron " + clothesFilter.length + " resultados"}</h6>
                        </CCol>
                        <CCol sm='4'>
                            <h5 className="float-right">Ordenar por</h5>
                        </CCol>
                        <CCol sm='3'>
                            <CFormGroup>
                                <CSelect custom name="order" id="order" className="float-right" value={this.state.orden} onChange={this.ordenar}>
                                    <option value="1">Precio: menor a mayor</option>
                                    <option value="2">Precio: mayor a menor</option>
                                    <option value="3">Calificación: menor a mayor</option>
                                    <option value="4">Calificación: mayor a menor</option>
                                </CSelect>
                            </CFormGroup>
                            
                        </CCol>
                    </CRow>
                    <CRow xs="6" md="12">
                        { currentItems.map((prenda,index) => 
                            <CCol key={index} xs="12" sm="6" md="4" className="mb-3">
                                <PrendaCard onClick={this.onClick} key={prenda.id} prenda={prenda}></PrendaCard>
                            </CCol>
                        ) }
                    </CRow>
                    <CRow xs="6" md="12">
                        <CPagination
                            align="center"
                            addListClass="some-class"
                            activePage={currentPage}
                            pages={totalPages}
                            onActivePageChange={this.pagina}
                        />
                    </CRow>
                </CCol>
            </CRow>
    }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        clothes: state.prenda.clothes,
        isLoading: state.prenda.isLoading,
        failed: state.prenda.failed,
        user: state.auth.user
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(Object.assign({},clothesActions), dispatch)
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Prendas)