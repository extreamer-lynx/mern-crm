import React from "react";
import M from "materialize-css/dist/js/materialize.min";
import {connect} from "react-redux"
import {getCategory} from "../store/action/categoryAction";
import {addProd} from "../store/action/productAction";

class AddProduct extends React.Component {

    constructor(props) {
        super(props)
        this.state = {file: '',imagePreviewUrl: ''}
        this.sendClick = this.sendClick.bind(this)
        this.formChange = this.formChange.bind(this)
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        M.FormSelect.init(document.querySelector("#category"));
    }

    componentDidMount(): void {
        this.props.dispatch(getCategory())
    }

    formChange (e) {
        if (e.target.id === "photo") {
            //this.setState({[e.target.id]: e.target.files[0]})
        }
        else {
            this.setState({[e.target.id]: e.target.value})
        }
    }

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    sendClick (e) {
        e.preventDefault()
        this.props.dispatch(addProd(this.state))
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="name" type="text" className="validate" onChange={(e) => this.formChange(e)}/>
                                <label htmlFor="name">Имя</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="count" type="text" className="validate" onChange={this.formChange}/>
                                <label htmlFor="count">Количество</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="cost" type="text" className="validate" onChange={this.formChange}/>
                                <label htmlFor="cost">Цена</label>
                            </div>

                            <div className="file-field input-field col s6">
                                <div className="btn">
                                    <span>Фото</span>
                                    <input type="file" id={"photo"} multiple onChange={(e)=>this.handleImageChange(e)}/>
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text"
                                           placeholder="Загрузите фото товара"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {this.props.category ?
                                <div className="input-field col s12">
                                    <select id={"category"} onChange={this.formChange}>
                                        <option value="" disabled>Выберите категорию</option>
                                        {
                                            this.props.category.map(item => {
                                                return <option key={item._id} value={item._id}>{item.ruCategory}</option>
                                            })}
                                    </select>
                                    <label>Категория</label>
                                </div> : <p>Категорий пока нет</p>
                            }
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea id="description" className="materialize-textarea" data-length="120" onChange={this.formChange}/>
                                <label htmlFor="description">Описание</label>
                            </div>
                        </div>
                        <button className="btn" onClick={this.sendClick}>Создать</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({category: state.categoryState, app: state.appState})

export default connect(mapStateToProps)(AddProduct)