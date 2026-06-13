import React from "react";
import { render, screen } from "@testing-library/react";

import UserPage from "../UserPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders user page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("user-datatable")).toBeInTheDocument();
    expect(screen.getByRole("user-add-button")).toBeInTheDocument();
});
