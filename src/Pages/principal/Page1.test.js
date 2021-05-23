import React from "react";
import { Page1 } from "./Page1";
import { MovieElement } from "./../../components/principal/MovieElement";
import * as axios from "axios";
import { moviesService } from "../../_services/movies.service";
//import renderer from 'react-test-renderer';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

jest.mock("axios");
const dataTest = {
  id: 1,
  title: "test",
  overview: "test",
  vote: 5,
  voteCount: 5,
  picture: "https://image.tmdb.org/t/p/w200//rEm96ib0sPiZBADNKBHKBv5bve9.jpg",
  release_date: "2020-1-13",
  modeActual: "grid",
};

configure({ adapter: new Adapter() });
describe("Principal", () => {
  it("header is ok", () => {
    const wrapper = shallow(<Page1 />);

    const header = <div>Favoritos</div>;
    const input = wrapper.find(".headPage1").at(0);
    expect(wrapper.contains(header)).toEqual(true);
  });
  it("check render childs", () => {
    const children = mount(
      <MovieElement
        id={dataTest.id}
        title={dataTest?.original_title}
        overview={dataTest?.overview}
        vote={dataTest.vote_average}
        voteCount={dataTest?.vote_count}
        picture={dataTest?.picture}
        modeActual={dataTest?.modeActual}
      />
    );
    const titleMovie = children.find(".titleMovie").text();
  });

  it("renders button", () => {
    const wrapper = shallow(<Page1 />);
    const header = <div>Favoritos</div>;
    expect(wrapper.contains(header)).toEqual(true);
  });

  test("good response", () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: "data",
      })
    );
    // ...
  });

  test("bad response", () => {
    axios.get.mockImplementation(() => Promise.reject({ data: "data" }));
    // ...
  });
});
