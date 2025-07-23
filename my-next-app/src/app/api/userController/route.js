import { NextResponse } from "next/server";
import { connectWithSSH } from "../../../dbMongo";
import User from "../../../models/userModel";
import CryptoJS from "crypto-js";

await connectWithSSH();

async function encontrarUsuario(user1) {
  try {
    let usuario = await User.findOne({ user: user1 });
    return usuario;
  } catch (error) {
    console.error("Error connecting or searching for user:", error);
    return null;
  }
}

export async function GET(request) {
  const usuarios = await User.find({});
  return NextResponse.json({ usuarios }, { status: 200 });
}

export async function POST(request) {
  await connectWithSSH();

  const r = await request.json();
  const usuario = r.usuario;
  const md5 = r.passMD5;
  const sha1 = r.passSHA1;
  const device = request.headers.get("user-agent") || "";

  try {
    const usuarioExistente = await encontrarUsuario(usuario);

    if (usuarioExistente) {
      return NextResponse.json(
        { error: "The user already exists" },
        { status: 400 },
      );
    }

    const nuevoUsuario = new User({
      user: usuario,
      md5: md5,
      sha1: sha1,
      device: device,
      activeSession: true,
    });

    await nuevoUsuario.save();
    return NextResponse.json(
      { success: "User successfully registered" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    await connectWithSSH();
    const r = await request.json();
    const usuarioAEliminar = r.usuarioAEliminar;
    if (!usuarioAEliminar) {
      return NextResponse.json(
        { error: "You must enter a user" },
        { status: 400 },
      );
    }
    const usuarioExistente = await encontrarUsuario(usuarioAEliminar);

    if (!usuarioExistente) {
      return NextResponse.json(
        { error: `The user: ${usuarioAEliminar}. Doesn't exists` },
        { status: 404 },
      );
    }

    await User.deleteOne({ user: usuarioAEliminar });
    return NextResponse.json(
      { success: "The user was successfully deleted" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error has ocurred" },
      { status: 400 },
    );
  }
}

export async function PUT(request) {
  try {
    await connectWithSSH();
    const r = await request.json();
    const anteriorUser = r.anteriorUser;
    const nuevoUser = r.nuevoUser;
    const nuevaPass = r.nuevaPass;

    if (!anteriorUser) {
      return NextResponse.json(
        { error: "You must enter a user" },
        { status: 400 },
      );
    }

    if (!nuevoUser) {
      return NextResponse.json(
        { error: "Please enter the new username" },
        { status: 400 },
      );
    }

    if (!nuevaPass) {
      return NextResponse.json(
        { error: "Please enter the new password" },
        { status: 400 },
      );
    }

    const usuarioBuscado = await encontrarUsuario(anteriorUser);

    if (!usuarioBuscado) {
      return NextResponse.json(
        { error: `The user: ${anteriorUser}. Doesn't exists` },
        { status: 404 },
      );
    }

    const nuevoUsuario = await encontrarUsuario(nuevoUser);

    if (nuevoUsuario) {
      return NextResponse.json(
        { error: "User is already in use" },
        { status: 400 },
      );
    }

    await User.replaceOne(
      { user: anteriorUser },
      {
        user: nuevoUser,
        md5: CryptoJS.MD5(nuevaPass).toString(),
        sha1: CryptoJS.SHA1(nuevaPass).toString(),
        device: request.headers.get("user-agent") || "",
        activeSession: true,
      },
    );
    return NextResponse.json(
      { success: "The user was successfully modified" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error has ocurred" },
      { status: 400 },
    );
  }
}
