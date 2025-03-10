from typing import List

from fastapi import Depends
from sqlalchemy.orm import Session

from src.dependencies import get_db
from src.models import note as note_model
import strawberry
from strawberry.fastapi import GraphQLRouter
import json


async def get_context(
    db=Depends(get_db),
):
    """
    Function-Based context manager.

    The context manager allows the creation and closing of a database connection for each request.
    """
    return {
        "db": db,
    }


@strawberry.type
class Colors:
    color_name: str
    color_header: str
    color_body: str
    color_text: str


@strawberry.type
class Position:
    x: int
    y: int


@strawberry.type
class Note:
    id: int
    title: str
    description: str
    colors: Colors | None  # One-to-One relationship
    position: Position | None  # One-to-One relationship


@strawberry.type
class Query:
    @strawberry.field
    def get_notes(self, info) -> list[Note]:
        """Get all notes"""
        db: Session = info.context["db"]
        return db.query(note_model.Note).all()

    @strawberry.field
    def get_note(self, info, id: int) -> Note | None:
        """Get a single note by id"""
        db: Session = info.context["db"]
        return (
            db.query(note_model.Note).filter(note_model.Note.id == id).first()
        )


@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_note(self, info, position: str, colors: str) -> Note:
        """Create a new note with an initial position and colors."""
        db: Session = info.context["db"]

        try:
            position_data = json.loads(position)
            new_position = note_model.Position(
                x=position_data["x"], y=position_data["y"]
            )
        except (json.JSONDecodeError, KeyError):
            raise ValueError("Invalid JSON format for position")

        try:
            color_data = json.loads(colors)
            new_color = note_model.Colors(
                color_name=color_data["colorName"],
                color_header=color_data["colorHeader"],
                color_body=color_data["colorBody"],
                color_text=color_data["colorText"],
            )
        except (json.JSONDecodeError, KeyError):
            raise ValueError("Invalid JSON format for colors")

        new_note = note_model.Note(
            title="", description="", position=new_position, colors=new_color
        )

        db.add(new_position)
        db.add(new_color)
        db.add(new_note)
        db.commit()
        db.refresh(new_note)

        return new_note

    @strawberry.mutation
    def update_note(
        self,
        info,
        id: int,
        description: str | None = None,
        position: str | None = None,
        colors: str | None = None,
    ) -> Note | None:
        """Update an existing note. Expects `body`, `position`, and `colors` as JSON strings."""
        db: Session = info.context["db"]
        note = (
            db.query(note_model.Note).filter(note_model.Note.id == id).first()
        )

        if not note:
            #TODO raise error when no note is found
            return None

        if description is not None:
            try:
                note.description = description
            except json.JSONDecodeError:
                raise ValueError("Invalid JSON format for body")

        if position is not None:
            try:
                position_data = json.loads(position)
                if note.position:
                    note.position.x = position_data["x"]
                    note.position.y = position_data["y"]
                else:
                    raise ValueError(
                        "Cannot update position because it does not exist."
                    )
            except (json.JSONDecodeError, KeyError):
                raise ValueError("Invalid JSON format for position")

        if colors is not None:
            try:
                color_data = json.loads(colors)
                if note.colors:
                    note.colors.color_name = color_data["colorName"]
                    note.colors.color_header = color_data["colorHeader"]
                    note.colors.color_body = color_data["colorBody"]
                    note.colors.color_text = color_data["colorText"]
                else:
                    raise ValueError(
                        "Cannot update colors because they do not exist."
                    )
            except (json.JSONDecodeError, KeyError):
                raise ValueError("Invalid JSON format for colors")

        db.commit()
        db.refresh(note)
        return note

    @strawberry.mutation
    def delete_note(self, info, id: int) -> bool:
        """Delete a note along with its related color and position"""
        db: Session = info.context["db"]
        note = (
            db.query(note_model.Note).filter(note_model.Note.id == id).first()
        )
        if note:
            db.delete(note)
            db.commit()
            return True
        return False


schema = strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQLRouter(schema, context_getter=get_context)
