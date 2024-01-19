import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  test("Updates on call submit", async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={createBlog} />);

    const title = screen.getByPlaceholderText("title");
    const author = screen.getByPlaceholderText("author");
    const url = screen.getByPlaceholderText("url");
    const saveButton = screen.getByText("Create");

    await user.type(title, "oliver twist");
    await user.type(author, "charles dickens");
    await user.type(url, "google.com");
    await user.click(saveButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]["title"]).toBe("oliver twist");
    expect(createBlog.mock.calls[0][0]["author"]).toBe("charles dickens");
    expect(createBlog.mock.calls[0][0]["url"]).toBe("google.com");
  });
});
