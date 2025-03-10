from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from src.db import Base, engine


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, index=True)
    description = Column(String)

    colors = relationship(
        "Colors",
        uselist=False,
        back_populates="note",
        cascade="all, delete-orphan",
    )
    position = relationship(
        "Position",
        uselist=False,
        back_populates="note",
        cascade="all, delete-orphan",
    )


class Colors(Base):
    __tablename__ = "colors"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    note_id = Column(
        Integer, ForeignKey("notes.id", ondelete="CASCADE"), unique=True
    )
    color_name = Column(String)
    color_header = Column(String)
    color_body = Column(String)
    color_text = Column(String)

    note = relationship("Note", back_populates="colors")

    def __init__(
        self,
        color_name: str,
        color_header: str,
        color_body: str,
        color_text: str,
    ):
        self.color_name = color_name
        self.color_header = color_header
        self.color_body = color_body
        self.color_text = color_text


class Position(Base):
    __tablename__ = "positions"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    note_id = Column(
        Integer, ForeignKey("notes.id", ondelete="CASCADE"), unique=True
    )
    x = Column(Integer)
    y = Column(Integer)

    note = relationship("Note", back_populates="position")

    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y


Base.metadata.create_all(bind=engine)
