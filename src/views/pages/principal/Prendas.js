import { CCol, CRow } from '@coreui/react';
import React, { Component } from 'react'
import PrendaCard from './PrendaCard';

export default class Prendas extends Component {


    render() {
            const prendaData = [
                {id: 0, nombre: "Saco Zara", precio: 45, talla: "S", color: "Rojo", detalles: "Tiene un descosido en la parte de atrás", marca: "Zara", sexo: 0, categoría: "saco", material: "tela", fotos: [{link: "https://http2.mlstatic.com/D_NQ_NP_720832-MPE48261251804_112021-O.webp"}, {link: "https://www.panoramaweb.com.mx/u/fotografias/m/2022/8/2/f850x638-33802_111291_5050.jpg"}], fechaPublicacion: "", vendedor: "Ocasi.on"},
                {id: 1, nombre: "Polo H&M", precio: 10, talla: "XS", color: "Rojo", detalles: "No", marca: "H&M", sexo: 1, categoría: "polo", material: "algodón", fotos: [{link: "https://nautica.com.pe/cdn/shop/products/K71006_6NR_A_89ff13d1-839b-4423-8309-53bbb632f804.jpg?v=1652803427"}, {link: "https://www.panoramaweb.com.mx/u/fotografias/m/2022/8/2/f850x638-33802_111291_5050.jpg"}], fechaPublicacion: "", vendedor: "Natalia Salas"},
                {id: 2, nombre: "Chompa Marrón", precio: 15, talla: "XS", color: "Marrón", detalles: "No", marca: "", sexo: 1, categoría: "chompa", material: "", fotos: [{link: "https://lastraperas-public.imgix.net/items/64d2ce621550170008316d2f/IMG_6734_clipped_rev_1.png?h=345&auto=format"}, {link: "https://www.panoramaweb.com.mx/u/fotografias/m/2022/8/2/f850x638-33802_111291_5050.jpg"}], fechaPublicacion: "", vendedor: "Maria Marroquín"},
                {id: 3, nombre: "Top Zara", precio: 15, talla: "S", color: "", detalles: "No", marca: "", sexo: 0, categoría: "Top", material: "", fotos: [{link: "https://lastraperas-public.imgix.net/items/64b8762b22ce520008503ff8/WhatsApp-Image-2023-08-25-at-1.19.34-PM_clipped_rev_1.png?h=345&auto=format"}, {link: "https://www.panoramaweb.com.mx/u/fotografias/m/2022/8/2/f850x638-33802_111291_5050.jpg"}], fechaPublicacion: "", vendedor: "Ocasi.on"},
            ]
        return (
            <CCol xs="12" sm="12" className="m-auto">
                <CRow xs="6" md="12">
                    { prendaData.map(prenda => <PrendaCard onClick={this.onClick} key={prenda.id} prenda={prenda}></PrendaCard>) }
                </CRow>
            </CCol>
        )
    }
}