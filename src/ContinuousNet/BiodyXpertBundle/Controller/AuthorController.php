<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\Author;
use ContinuousNet\BiodyXpertBundle\Form\AuthorType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Author Controller
 * 
 * Manage Authors 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\BiodyXpertBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://biodyxpert.continuousnet.com/ContinuousNet/BiodyXpertBundle/Controller
 * @see		AuthorController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/author")
 */
class AuthorController extends BaseController
{
	/**
	 * Lists all Author entities.
	 *
	 * @Route("/", name="author_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$authors = $em->getRepository('BiodyXpertBundle:Author')->findAll();

		return $this->render('BiodyXpertBundle:Author:index.html.twig', array(
			'authors' => $authors,
		));
	}

	/**
	 * Creates a new Author entity.
	 *
	 * @Route("/new", name="author_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$author = new Author();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\AuthorType', $author);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($author);
			$em->flush();

			return $this->redirectToRoute('author_show', array('id' => $author->getId()));
		}

		return $this->render('BiodyXpertBundle:Author:new.html.twig', array(
			'author' => $author,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Author entity.
	 *
	 * @Route("/{id}", name="author_show")
	 * @Method("GET")
	 */
	public function showAction(Author $author)
	{
		$deleteForm = $this->createDeleteForm($author);

		return $this->render('BiodyXpertBundle:Author:show.html.twig', array(
			'author' => $author,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Author entity.
	 *
	 * @Route("/{id}/edit", name="author_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Author $author)
	{
		$deleteForm = $this->createDeleteForm($author);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\AuthorType', $author);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($author);
			$em->flush();

			return $this->redirectToRoute('author_edit', array('id' => $author->getId()));
		}

		return $this->render('BiodyXpertBundle:Author:edit.html.twig', array(
			'author' => $author,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Author entity.
	 *
	 * @Route("/{id}", name="author_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Author $author)
	{
		$form = $this->createDeleteForm($author);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($author);
			$em->flush();
		}

		return $this->redirectToRoute('author_index');
	}

	/**
	 * Creates a form to delete a Author entity.
	 *
	 * @param Author $author The Author entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Author $author)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('author_delete', array('id' => $author->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
